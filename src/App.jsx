import { GuestLayout } from "@/components";
import { Home, Pricing } from "@/pages";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnauthorizedModal from "./components/common/UnauthorizedModal";
import ProtectedRoutes from "./routes";

const App = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const showUnauthorizedModal = useSelector(
    (state) => state.auth.showUnauthorizedModal
  );
  return (
    <>
      <BrowserRouter>
        {!accessToken ? (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <GuestLayout>
                    <Home />
                  </GuestLayout>
                }
              />
              <Route
                path="/pricing"
                element={
                  <GuestLayout>
                    <Pricing />
                  </GuestLayout>
                }
              />
            </Routes>
          </>
        ) : (
          <ProtectedRoutes />
        )}
        <UnauthorizedModal open={showUnauthorizedModal} />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
