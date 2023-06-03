import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnauthorizedModal from "./components/common/UnauthorizedModal";

import ProtectedRoutes from "./routes";
import { useEffect } from "react";
import { useWrap } from "./hooks/useWrap";
import AuthService from "./service/auth-service";
import { setUser } from "./features/user/userSlice";

const App = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const showUnauthorizedModal = useSelector(
    (state) => state.auth.showUnauthorizedModal
  );
  const dispatch = useDispatch();

  const wrappedFetchMe = useWrap(() => AuthService.fetchMe());

  useEffect(() => {
    let active = true;

    if (accessToken) {
      (async () => {
        const response = await wrappedFetchMe();
        if (!active) return;
        dispatch(setUser(response.data));
      })();
    }

    return () => {
      active = false;
    };
  }, [accessToken]);
  return (
    <>
      <BrowserRouter>
        <ProtectedRoutes />
        <UnauthorizedModal open={showUnauthorizedModal} />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
