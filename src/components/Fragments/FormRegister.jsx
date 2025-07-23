import React from "react";
import { InputForm } from "../Elements/Input/Index";
import { Button } from "../Elements/Button.jsx/Index";

export const FormRegister = () => {
  return (
    <form action="">
      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="example@gmail.com"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="xxxxxxxxxxxxxxx"
      />
      <Button classname="bg-blue-500 w-full">Register</Button>
    </form>
  );
};
