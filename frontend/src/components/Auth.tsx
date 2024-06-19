import { SignupInput } from "@sub_1n/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";

// trpc library: have a look for type safety in ts
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      console.log("response: ", response.data);
      const { jwt, name } = response.data;
      localStorage.setItem("token", jwt);
      localStorage.setItem("name", name);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      alert("Error: error while sending request");
    }
  }

  return (
    <div className=" h-screen flex justify-center items-center flex-col ">
      <div className=" max-w-lg p-4 ">
        <div className="text-5xl font-bold text-center">
          {type === "signup" ? "Create an Account" : "Log into your Account"}
        </div>
        <div className="text-xl text-slate-400 text-center mt-2 mb-6">
          {type === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="underline pl-2"
          >
            {type === "signup" ? "Sign in" : "Sign up"}
          </Link>
        </div>
        {type === "signup" ? (
          <LabelledInput
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
          />
        ) : null}
        <LabelledInput
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Password"
          type={"password"}
          placeholder="Enter your password"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          onClick={sendRequest}
        >
          {type === "signin" ? "Sign in" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputInterface {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputInterface) {
  return (
    <>
      <label className="block mb-1 text-md font-medium text-gray-900 ">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 mb-4"
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
        required
      />
    </>
  );
}
