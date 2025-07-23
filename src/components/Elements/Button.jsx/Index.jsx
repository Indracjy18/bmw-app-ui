import React from "react";

export const Button = ({ children, classname, type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classname} px-4 py-2 rounded-md font-semibold text-white transition duration-200`}
    >
      {children}
    </button>
  );
};
