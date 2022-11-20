import { setShowUnauthorizedModal } from "@/features/auth/authSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useWrap = (callback, defaultValueFunction = () => {}) => {
  const dispatch = useDispatch();
  const wrappedCallback = useCallback(
    async (...args) => {
      try {
        const response = await callback(...args);

        return response;
      } catch (error) {
        if (error?.response?.status === 401) {
          dispatch(setShowUnauthorizedModal(true));
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          return defaultValueFunction();
        }
        throw error;
      }
    },
    [callback]
  );

  return wrappedCallback;
};
