import { setAccessToken, setRefreshToken } from "@/features/auth/authSlice";
import { setUser } from "@/features/user/userSlice";
import { useWrap } from "@/hooks/useWrap";
import AuthService from "@/service/auth-service";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrappedLogout = useWrap(() => AuthService.logout());

  useEffect(() => {
    (async () => {
      await wrappedLogout();
      dispatch(setRefreshToken(""));
      dispatch(setAccessToken(""));
      dispatch(setUser(null));
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      navigate("/");
    })();
  }, []);

  return <div>Logout...</div>;
}

export default Logout;
