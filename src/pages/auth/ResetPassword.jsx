import { Button } from "@/components/common";
import { FormControl } from "@/components/form";
import useToast from "@/hooks/useToast";
import AuthService from "@/service/auth-service";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  new_password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("This field is required"),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref("new_password")], "Password not match")
    .required("This field is required"),
});

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast("dark");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        await AuthService.verifyForgotPasswordToken(token);
      } catch (error) {
        setError(error?.response?.data?.message || "Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [token]);

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
      setIsSubmitting(true);
      const response = await AuthService.resetPassword({ ...val, token });
      setIsSubmitting(false);
      showToast(response.message);
      navigate("/");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
      console.log(error);
      setIsSubmitting(false);
    }
  };
  let content = <p>Loading...</p>;

  if (!loading && error) {
    content = (
      <>
        <div className="bg-red w-full rounded-md text-white p-4 bg-red-500">
          {error}
        </div>
        <Button>Back to home</Button>
      </>
    );
  }

  if (!loading && !error) {
    content = (
      <div className="max-w-md w-full border p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="font-bold text-2xl text-center mb-4">
            Reset your password
          </p>
          <FormControl
            {...getFormAttr("New Password", "new_password", "new_password")}
            type="password"
          />
          <FormControl
            {...getFormAttr(
              "Confirm New Password",
              "new_password_confirmation",
              "new_password_confirmation"
            )}
            type="password"
          />
          <Button isLoading={isSubmitting} className="w-full" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center bg-white p-4 gap-4">
      {content}
    </div>
  );
}

export default ResetPassword;
