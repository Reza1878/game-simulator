import { FormControl } from "@/components/form";
import useToast from "@/hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Text, Button } from "@/components/common";
import AuthModalContext from "@/context/AuthModalContext";
import AuthService from "@/service/auth-service";
import { setUser } from "@/features/user/userSlice";
import { setAccessToken } from "@/features/auth/authSlice";

const schema = yup.object({
  email: yup
    .string()
    .email()
    .typeError("Must be valid email")
    .required("This field is required"),
  name: yup.string().required("This field is required"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("This field is required"),
  passwordConf: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password didn't match"),
});

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
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
    const response = await AuthService.register(val);
    const { data } = response;
    dispatch(setUser(data));
    dispatch(setAccessToken(data.token));
    setLoading(false);
    setShowAuthModal(false);
    showToast("Register success");
    } catch (error) {
    console.log(error);
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
        <Text className="mb-3">Please fill out this form</Text>
        <FormControl {...getFormAttr("Email", "email", "email")} type="email" />
        <FormControl {...getFormAttr("Name", "name", "name")} />
        <FormControl
          {...getFormAttr("Password", "password", "password")}
          type="password"
        />
        <FormControl
          {...getFormAttr(
            "Confirmation Password",
            "passwordConf",
            "passwordConf"
          )}
          type="password"
        />
        <Button isLoading={loading} type="submit" className="w-full">
          Register
        </Button>
      </form>
      <Button
        className="px-0"
        variant="link"
        onClick={() => setAuthForm("LOGIN")}
      >
        Already have account? Login
      </Button>
    </>
  );
}

export default RegisterForm;
