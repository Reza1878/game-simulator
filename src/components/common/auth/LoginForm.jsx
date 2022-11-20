import React, { useContext, useState } from "react";
import { Button, Text } from "@/components/common";
import { FormControl } from "@/components/form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "@/service/auth-service";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import { setAccessToken } from "@/features/auth/authSlice";
import useToast from "@/hooks/useToast";
import AuthModalContext from "@/context/AuthModalContext";
import { useNavigate } from "react-router-dom";
import { ROUTE_ADMIN_DASHBOARD } from "@/config/routes";

const schema = yup.object({
  email: yup
    .string()
    .email()
    .typeError("Must be valid email")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { showToast } = useToast("dark");
  const { setShowAuthModal, setAuthForm } = useContext(AuthModalContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const getFormAttr = (label, name, id) => {
    return {
      label,
      name,
      id,
      register,
      error: !!errors[name],
      helperText: errors[name]?.message,
    };
  };
  const onSubmit = async (val) => {
    try {
      setError("");
      setLoading(true);
      const response = await AuthService.login(val);
      const { data } = response;
      dispatch(setUser(data));
      dispatch(setAccessToken(data.token));
      setLoading(false);
      setShowAuthModal(false);
      showToast("Authentication success");
      if (data.role === "admin") {
        navigate(ROUTE_ADMIN_DASHBOARD);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="bg-red-500 p-2 rounded-md text-white mb-2 font-medium">
            {error}
          </div>
        )}
        <Text className="mb-3">Please sign in to start your session</Text>
        <FormControl {...getFormAttr("Email", "email", "email")} />
        <FormControl
          {...getFormAttr("Password", "password", "password")}
          type="password"
        />
        <Button isLoading={loading} type="submit" className="w-full">
          Sign In
        </Button>
      </form>
      <Button
        className="px-0"
        variant="link"
        onClick={() => setAuthForm("REGISTER")}
      >
        Not have account? Register
      </Button>
    </>
  );
}

export default LoginForm;
