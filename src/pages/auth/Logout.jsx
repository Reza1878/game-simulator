import { setAccessToken } from "@/features/auth/authSlice";
import { setUser } from "@/features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAccessToken(""));
    dispatch(setUser(null));
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/");
  }, []);

  return <div>Logout...</div>;
}

export default Logout;
