import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBLogInput, updateBlogInput } from "@shivamkrandom/medium";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
};

export const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// Middleware to check if the user is authenticated
blogRouter.use("/auth/*", async (c, next) => {
  const header = c.req.header("authorization");
  if (!header) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  try {
    const [_, token] = header.split(" ");
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id);
      await next();
    } else {
      return c.json({ error: "Unauthorized" }, 403);
    }
  } catch (e) {
    return c.json({ error: "Unauthorized" }, 403);
  }
});

// Route to create a new blog
blogRouter.post("/auth/", async (c) => {
  const body = await c.req.json();
  const { success, error } = createBLogInput.safeParse(body);
  if (!success) {
    console.log(error);
    return c.json({ error: "Invalid input" }, 400);
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
      date: body.date,
    },
  });

  return c.json({
    id: blog.id,
    message: "Blog created successfully",
  });
});

blogRouter.put("/auth/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    console.log(success);
    return c.json({ error: "Invalid input" }, 400);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
      authorId: c.get("userId"),
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
    message: "Blog updated successfully",
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      date: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(blogs);
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");

  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      date: true,
      author: {
        select: {
          name: true,
          description: true,
          id: true,
        },
      },
    },
  });
  return c.json(blog);
});
