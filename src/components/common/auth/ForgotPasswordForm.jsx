import { FormControl } from "@/components/form";
import AuthModalContext from "@/context/AuthModalContext";
import AuthService from "@/service/auth-service";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Text } from "..";

const schema = yup.object({
  email: yup
    .string()
    .email("Must be valid email")
    .required("This field is required"),
});

function ForgotPasswordForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { setAuthForm } = useContext(AuthModalContext);

  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setAlert({ type: "", msg: "" });
      const response = await AuthService.forgotPassword(val);
      const { data, message } = response;
      setAlert({ type: "msg", msg: message });
      setLoading(false);
    } catch (error) {
      setAlert({
        msg: error?.response?.data?.message || "Something went wrong",
        type: "error",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {alert.msg && (
          <div
            className={clsx(
              "p-2 rounded-md text-white mb-2 font-medium",
              { "bg-red-500": alert.type === "error" },
              { "bg-primary": alert.type === "msg" }
            )}
          >
            {alert.msg}
          </div>
        )}
        <Text className="mb-3">Please enter your email</Text>
        <FormControl {...getFormAttr("Email", "email", "email")} />
        <Button isLoading={loading} type="submit" className="w-full">
          Submit
        </Button>
      </form>
      <Button
        className="px-0"
        variant="link"
        onClick={() => setAuthForm("LOGIN")}
      >
        Sign in
      </Button>
    </>
  );
}

export default ForgotPasswordForm;
