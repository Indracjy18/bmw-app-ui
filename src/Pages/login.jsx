import React from "react";
import { FormLogin } from "../components/Fragments/FormLogin";
import { LayoutForm } from "../components/Layouts/LayoutForm";

export const LoginPage = () => {
  return (
    <LayoutForm title="Login" type="login">
      <FormLogin />
    </LayoutForm>
  );
};
