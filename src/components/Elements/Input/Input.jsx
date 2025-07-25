import React from "react";

export const Input = (props) => {
  const { type, placeholder, name, onChange } = props;
  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-3 text-slate-700"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
};
