import { Hono } from "hono";
import { PrismaClient, Prisma } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@shivamkrandom/medium";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

export const userRouter = new Hono<{
  Bindings: Bindings;
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.json({ error: "Invalid input" }, 411);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return c.json({ error: "Email id already exists" }, 409);
      }
    }

    return c.json({ error: "Failed to create account" }, 401);
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json({ error: "Invalid input" }, 411);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    return c.json({ error: "Invalid email or password" }, 404);
  } else {
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  }
});

userRouter.get("/info", async (c) => {
  const header = c.req.header("authorization");
  if (!header) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  const [_, token] = header.split(" ");

  const response = await verify(token, c.env.JWT_SECRET);

  if (response.id) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.findUnique({
      where: {
        id: response.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        description: true,
      },
    });
    return c.json({ user });
  } else {
    return c.json({ error: "Unauthorized" }, 403);
  }
});


userRouter.put("/description", async (c) => {
  const body = await c.req.json();
  const header = c.req.header("authorization");
  if (!header) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  const [_, token] = header.split(" ");

  const response = await verify(token, c.env.JWT_SECRET);

  if (response.id) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.update({
      where: {
        id: response.id,
      },
      data: {
        description: body.description,
      },
    });
    return c.json({ user });
  } else {
    return c.json({ error: "Unauthorized" }, 403);
  }
});

