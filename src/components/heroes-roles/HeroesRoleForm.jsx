import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { FormControl } from "../form";

const schema = yup.object({
  name: yup.string().required("This field is required"),
});

function HeroesRoleForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, { name: null })
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
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

      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default HeroesRoleForm;
