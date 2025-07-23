import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";

export const InputForm = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
  labelClassName = "",
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};
