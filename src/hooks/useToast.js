import { useMemo } from "react";
import { toast } from "react-toastify";

export default function useToast(theme = "dark") {
  const methods = useMemo(() => {
    const showToast = (message, type = "success") => {
      toast[type](message, {
        autoClose: 3000,
        theme: "colored",
        position: "top-right",
        pauseOnHover: false,
        theme,
      });
    };

    const showInvalidRequestToast = (err) => {
      showToast(
        err?.response?.data?.message || "Something went wrong",
        "error"
      );
    };

    return { showToast, showInvalidRequestToast };
  });

  return methods;
}
