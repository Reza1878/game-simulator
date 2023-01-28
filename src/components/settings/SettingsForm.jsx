import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { FormControl } from "../form";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("This field is required"),
});

function SettingsForm({
  defaultValue = {},
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
}) {
  const [initValue] = useState(() =>
    purgeInitialFormData(defaultValue, { email: "" })
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initValue,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        register={register}
        name="email"
        label="Email"
        type="email"
        helperText={errors?.email?.message}
        error={!!errors?.email}
      />
      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default SettingsForm;
