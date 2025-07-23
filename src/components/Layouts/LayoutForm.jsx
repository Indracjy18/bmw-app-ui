import React from "react";
import { FormLogin } from "../Fragments/FormLogin";
import { Link } from "react-router-dom";

export const LayoutForm = (props) => {
  const { children, title, type } = props;
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-xs">
        <h1 className="text-blue-600 text-3xl font-bold mb-4 text-center ">
          {title}
        </h1>
        <p className="text-slate-500 font-medium text-sm mb-2">
          Welcome, Please enter your detail
        </p>
        {children}
        <p className="text-sm mt-5 text-center">
          {type === "login"
            ? "Dont't have an account? "
            : "Already have an account? "}

          {type === "login" && (
            <Link to="/register" className="font-bold text-blue-600">
              Register
            </Link>
          )}
          {type === "register" && (
            <Link to="/login" className="font-bold text-blue-600">
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};
