import AuthModalContext from "@/context/AuthModalContext";
import { setAccessToken } from "@/features/auth/authSlice";
import { setUser } from "@/features/user/userSlice";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "./common";

function AuthNavbarItem({ small = false }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { setShowAuthModal, setAuthForm } = useContext(AuthModalContext);
  const dispatch = useDispatch();

  if (accessToken) {
    return (
      <>
        <li
          className="font-medium cursor-pointer text-dimWhite hover:text-white transition-all ml-0 lg:ml-10"
          onClick={() => {
            dispatch(setAccessToken(""));
            dispatch(setUser(null));
          }}
        >
          <Text>Logout</Text>
        </li>
      </>
    );
  }

  return (
    <>
      <li
        className="font-medium cursor-pointer text-dimWhite hover:text-white transition-all mb-4 md:mb-0 ml-0 md:ml-10"
        onClick={() => {
          setShowAuthModal(true);
          setAuthForm("LOGIN");
        }}
      >
        <Text>Login</Text>
      </li>
      <li
        className="font-medium cursor-pointer text-dimWhite hover:text-white transition-all ml-0 md:ml-10"
        onClick={() => {
          setShowAuthModal(true);
          setAuthForm("REGISTER");
        }}
      >
        <Text>Register</Text>
      </li>
    </>
  );
}

export default AuthNavbarItem;
