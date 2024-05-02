import { InputFeild } from "./InputFeild";
import { useState } from "react";
import { SigninInput, SignupInput } from "@shivamkrandom/medium";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BarLoader } from "react-spinners";
import { coustomAlert } from "./coustomAlert";


function Auth({ type }: { type: "signup" | "signin" }) {
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({} as SignupInput);

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (type == "signup") {
      setLoading(true);
      axios
        .post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          coustomAlert("success", "User created Successfully.")
          navigate("/blogs");
        })
        .catch((err) => {
          setLoading(false);
          coustomAlert("error", err.response.data.error)
          console.log(err);
        });
    } else {
      const signinInput: SigninInput = {
        email: postInputs.email,
        password: postInputs.password,
      };;
      setLoading(true);
      axios
        .post(`${BACKEND_URL}/api/v1/user/signin`, signinInput)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          // alert("User signed in successfully");
          coustomAlert("success", "User signed in successfully.")
          navigate("/blogs");
        })
        .catch((err) => {
          setLoading(false);
          // alert("Error signing in user");
          coustomAlert("error", err.response.data.error)
          console.log(err);
        });
    }
  };


  return (
    <div className="overflow-hidden items-center text-slate-700  w-[28rem] border  rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-1  transition-all duration-300  border-gray-300">
      <BarLoader color="#36d7b7" width={500} loading={loading} height={5} />
      <div className="flex justify-center  flex-col gap-5  p-6 px-3 sm:px-6">
        <div className="flex items-center  w-full gap-2 border rounded-full p-2 bg-slate-200">
          <a
            className="bg-slate-200 rounded-full h-10 w-10 flex items-center justify-center   hover:shadow-md hover:scale-105 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaHome className="" size={25} />
          </a>
          <IoIosArrowForward size={25} />
          <div className="text-2xl font-bold text-center">
            {type == "signup" ? "Create an account" : "Sign in to account"}
          </div>
        </div>

        <form
          className="mt-2 w-full flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          {type == "signup" && (
            <InputFeild
              label="Fullname"
              placeholder="Enter your name"
              type="text"
              autocomplete="name"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          )}
          <InputFeild
            label="Email"
            placeholder="abc@example.com"
            type="email"
            autocomplete="email"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          />
          <InputFeild
            label="Password"
            placeholder="********"
            type="password"
            autocomplete="current-password"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />

          <button
            type="submit"
            className="bg-slate-700 hover:bg-black text-white py-2 rounded-md text-xl mt-4 shadow hover:shadow-lg hover:-translate-y-1 transition-all font-semibold"
          >
            {type == "signup" ? "Sign up" : "Sign in"}
          </button>
        </form>

        <div className="text-slate-500 text-center">
          {type == "signup"
            ? "Already have an account ?"
            : "Don't have an account ?"}{" "}
          <a
            onClick={()=>navigate(type == "signup" ? "/signin" : "/signup")}
            className="text-blue-500 underline hover:text-blue-700 transition-all font-medium cursor-pointer"
          >
            {type == "signup" ? "Sign in" : "Sign up"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Auth;
