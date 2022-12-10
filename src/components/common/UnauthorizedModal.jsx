import {
  setAccessToken,
  setShowUnauthorizedModal,
} from "@/features/auth/authSlice";
import { setUser } from "@/features/user/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Modal from "./Modal";
import Text from "./Text";

function UnauthorizedModal({ open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setShowUnauthorizedModal(false));
    dispatch(setAccessToken(""));
    dispatch(setUser(null));
    navigate("/");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };
  return (
    <Modal open={open}>
      <Text variant="h3" className="font-medium mb-3">
        Your session has expired
      </Text>
      <Button className="w-full" onClick={handleClick}>
        Login
      </Button>
    </Modal>
  );
}

export default UnauthorizedModal;
