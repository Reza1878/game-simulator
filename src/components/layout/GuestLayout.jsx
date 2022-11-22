import AuthModalContext from "@/context/AuthModalContext";
import styles from "@/style";
import React, { useState } from "react";
import { AuthModal } from "../common";
import Navbar from "../Navbar";

function GuestLayout({ children }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authForm, setAuthForm] = useState("");
  return (
    <AuthModalContext.Provider
      value={{
        showAuthModal,
        setShowAuthModal,
        authForm,
        setAuthForm,
      }}
    >
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        {children}
      </div>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </AuthModalContext.Provider>
  );
}

export default GuestLayout;
