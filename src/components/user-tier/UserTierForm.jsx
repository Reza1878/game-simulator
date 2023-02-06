import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { FormControl } from "../form";

const schema = yup.object({
  name: yup.string().required("This field is required"),
  max_session: yup
    .number()
    .typeError("Mus be a number")
    .required("This field is required"),
});

function UserTierForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, { name: "", max_session: 0 })
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormData,
  });

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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl {...getFormAttr("Name", "name", "name")} />
      <FormControl
        {...getFormAttr("Max Session", "max_session", "max_session")}
        type="number"
      />

      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default UserTierForm;
