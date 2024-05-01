import { MouseEventHandler, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Avatar } from "./Avatar";
import { coustomAlert } from "./coustomAlert";
import menuIcon from "@/assets/menu.svg";
import closeIcon from "@/assets/close.svg";
import penIcon from "@/assets/pen.svg";
import logoutIcon from "@/assets/logout.svg";
import logo from "@/assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { useRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/user";
import { publishAtom } from "@/store/atoms/publish";

function Navbar() {
  const token = localStorage.getItem("token");
  const [auth, setAuth] = useState<boolean>(token ? true : false);

  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (auth && user.id === "") {
      console.log({ before: user });
      axios
        .get(`${BACKEND_URL}/api/v1/user/info`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((respose) => {
          setUser(respose.data.user);
        })
        .catch(() => {
          setAuth(false);
          coustomAlert("error", "Unauthorized user. Please login again.");
        });
    }
  }, [token]);

  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="border-b bg-gray-100 py-2 fixed top-0 w-full z-40 opacity-100 pr-10 lg:pr-0 h-14">
        <div className="container flex justify-between items-center h-full">
          <a onClick={handleHome} className="cursor-pointer text-xl font-bold">
            <div className="flex items-center">
              <img src={logo} alt="" className="h-14" />
              <p className="text-3xl">Blog</p>
            </div>
          </a>
          {auth ? (
            <div className="flex gap-3 items-center">
              <LogoutButton />
              <HoverAvatarComponent />
            </div>
          ) : (
            <div className="flex gap-3">
              <SigninButton classx="hidden lg:block" />
              <SignupButton classx="hidden lg:block" />
            </div>
          )}
        </div>
      </nav>
      <Menu auth={auth} />
    </>
  );
}

function Menu({ auth }: { auth: boolean }) {
  const [menu, setMenu] = useState(false);
  const [_, setUser] = useRecoilState(userAtom);
  const handleLogout = () => {
    setUser({ id: "", name: "", email: "", description: "" });
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <button
        className="fixed  lg:hidden z-50 top-3 right-5 "
        onClick={() => setMenu(!menu)}
      >
        <img
          src={menu ? closeIcon : menuIcon}
          alt="menuButton"
          className="h-8"
        />
      </button>
      <div
        className={`fixed  rounded-b-2xl shadow-md left-0 container bg-gray-100 w-full  flex flex-col gap-4 border-t transition-all duration-700 ease-in-out z-[10] lg:hidden opacity-100 ${
          menu ? "top-14 " : "top-[-500px] opacity-0"
        }`}
      >
        <div className="flex gap-4 flex-col items-start py-3">
          {auth ? (
            <>
              <UserDetails />
              <UserDescription />

              <button
                className="px-2 py-1 mt-4 mb-2 bg-red-400 rounded-sm text-sm text-white font-bold flex items-center gap-3 ml-auto"
                onClick={handleLogout}
              >
                <span>Logout</span>{" "}
                <img className="h-4" src={logoutIcon} alt="" />
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-full">
                <div className=" font-bold font-[Sans-serif]">
                  <p>Join us to Publish Your own blog</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">Already have an account?</p>
                  <SigninButton classx="bg-green-200 rounded w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">Don't have an account?</p>
                  <SignupButton classx="bg-green-200 rounded w-20" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <PublishButtonMobile auth={auth} />
    </>
  );
}

function PublishButtonMobile({ auth }: { auth: boolean }) {
  const [publish, _] = useRecoilState(publishAtom);
  const navigate = useNavigate();
  const handlePublish = () => {
    navigate("/create");
  };
  return (
    <>
      {publish ? (
        <button
          onClick={handlePublish}
          className={`shadow-xl shadow-slate-400 hover:shadow-slate-700 h-16 w-16 rounded-full bg-green-500 fixed bottom-5 right-5 flex items-center justify-center hover:-translate-y-2 transition-all duration-300 ${
            !auth && "hidden"
          }`}
        >
          <img src={penIcon} alt="" className="h-6" />
        </button>
      ) : null}
    </>
  );
}

function UserDetails() {
  const [user, _] = useRecoilState(userAtom);
  return (
    <div className="border-b w-full">
      <p className="font-medium">{user.name}</p>
      <p className="text-xs italic">{user.email}</p>
    </div>
  );
}

function UserDescription() {
  const [user, setUser] = useRecoilState(userAtom);
  const [description, setDescription] = useState(user.description);

  const handleDescription = () => {
    axios
      .put(
        `${BACKEND_URL}/api/v1/user/description`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUser((user) => ({
          ...user,
          description: res.data.user.description,
        }));
        coustomAlert("success", "Description updated successfully.");
      })
      .catch(() => {
        coustomAlert("error", "Error while updating the description.");
      });
  };
  return (
    <>
      <div className="flex justify-between w-full">
        <div>
          <p className="font-medium text-xs">Description</p>
          <p className="text-sm">{user.description}</p>
        </div>
        <Dialog>
          <DialogTrigger className="w-8 p-2 m-1 hover:bg-slate-100 rounded-full hover:scale-110 hover:-translate-y-1 transition-all duration-300">
            <img src={penIcon} alt="setting Icon" className=" " />
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Edit Your profile description.</DialogTitle>
              <DialogDescription>
                <div>
                  <textarea
                    className="w-full p-2 border rounded my-4"
                    placeholder={`${user.description}`}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <button
                    className="bg-gray-700 text-white px-2 py-1 rounded "
                    onClick={handleDescription}
                  >
                    Update Description
                  </button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

function LogoutButton() {
  const navigate = useNavigate();
  const [_, setUser] = useRecoilState(userAtom);
  const handleLogout = () => {
    setUser({ id: "", name: "", email: "", description: "" });
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Bounce
      text="logout"
      classx="hover:underline hover:underline-offset-8 decoration-4 decoration-gray-600 decoration-red-500 hover:text-red-500 hidden lg:block"
      onClick={handleLogout}
    />
  );
}

function SigninButton({ classx }: { classx?: string }) {
  const navigate = useNavigate();
  return (
    <Bounce
      text="Sign In"
      classx={`hover:underline hover:underline-offset-8 decoration-4 decoration-gray-600 ${classx}`}
      onClick={() => navigate("/signin")}
    />
  );
}

function SignupButton({ classx }: { classx?: string }) {
  const navigate = useNavigate();
  return (
    <Bounce
      text="Sign Up"
      classx={`hover:underline hover:underline-offset-8 decoration-4 decoration-gray-600 ${classx}`}
      onClick={() => navigate("/signup")}
    />
  );
}

function HoverAvatarComponent() {
  const [user, _] = useRecoilState(userAtom);
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger>
        <Avatar
          name={user?.name}
          classx="p-2 h-10 w-10 text-xl shadow-inner cursor-pointer hover:shadow-md hover:scale-110 transition ease-in-out duration-300"
        />
      </HoverCardTrigger>
      <HoverCardContent className="">
        <HoverCardArrow className="fill-gray-300" />
        <div className="bg-gray-300  mx-2  mr-5 rounded text-gray-600 overflow-hidden flex flex-col p-4 box-content gap-3">
          <UserDetails />
          <UserDescription />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function Bounce({
  text,
  onClick,
  classx,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  classx?: string;
}) {
  return (
    <button
      className={`font-medium px-2 py-0.5 hover:-translate-y-1 transition ease-in-out duration-300  ${classx}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Navbar;
