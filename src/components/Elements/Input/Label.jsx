import React from "react";

export const Label = (props) => {
  const { children, htmlFor } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="block text-slate-700 text-sm font-bold mb-2"
    >
      {children}
    </label>
  );
};
