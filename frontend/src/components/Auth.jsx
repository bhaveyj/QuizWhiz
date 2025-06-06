import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config.js"

export const Auth = ({ type }) => {
  const [postInputs, setPostInputs] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/${type === "signup" ? "signup" : "login"}`, postInputs);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              {type === "signup" ? "Create an account" : "Welcome back"}
            </div>
            <div className="mt-2 text-gray-400">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link className="pl-1 underline" to={type === "signup" ? "/login" : "/signup"}>
                {type === "signup" ? "Log In" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {/* {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="Enter your name"
                type="text"
                onChange={(e) =>
                  setPostInputs({ ...postInputs, name: e.target.value })
                }
              />
            )} */}
            <LabelledInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              onChange={(e) =>
                setPostInputs({ ...postInputs, email: e.target.value })
              }
            />
            <LabelledInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
            />
            <button
              onClick={sendRequest}
              type="button"
              className="text-white w-full mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
            >
              {type === "signup" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LabelledInput = ({ placeholder, label, onChange, type }) => {
  return (
    <div>
      <label className="block mb-2 text-lg mt-2 text-gray-900 font-bold">{label}</label>
      <input
        onChange={onChange}
        type={type}
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};
