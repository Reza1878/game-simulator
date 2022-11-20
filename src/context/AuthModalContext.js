import React from "react";

const AuthModalContext = React.createContext({
  showAuthModal: false,
  setShowAuthModal: () => {},
  authForm: "",
  setAuthForm: () => {},
});

export default AuthModalContext;
