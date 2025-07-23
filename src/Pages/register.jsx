import React from "react";
import { LayoutForm } from "../components/Layouts/LayoutForm";
import { FormRegister } from "../components/Fragments/FormRegister";

export const RegisterPage = () => {
  return (
    <LayoutForm title="Register" type="register">
      <FormRegister />
    </LayoutForm>
  );
};
