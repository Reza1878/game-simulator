import React, { useContext } from "react";

import { logo } from "@/assets";
import LoginForm from "./LoginForm";
import { Modal } from "..";
import AuthModalContext from "@/context/AuthModalContext";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

function AuthModal({ open = false, onClose = () => {} }) {
  const { authForm } = useContext(AuthModalContext);
  let content = <LoginForm />;
  if (authForm === "REGISTER") {
    content = <RegisterForm />;
  } else if (authForm === "FORGOT PASSWORD") {
    content = <ForgotPasswordForm />;
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-primary p-2 flex justify-center rounded-md mb-3">
        <img src={logo} className="w-[124px] h-[32px]" />
      </div>
      {content}
    </Modal>
  );
}

export default AuthModal;
