import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { FormControl } from "../form";
import { BASE_PRICING_BLANK_PAGE } from "./constants";

const schema = yup.object({
  name: yup.string().required("This field is required").min(3),
  description: yup.string().required("This field is required"),
  price: yup
    .number()
    .typeError("Must be a number")
    .required("This field is required"),
});

function PricingForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, BASE_PRICING_BLANK_PAGE)
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
      <FormControl
        {...getFormAttr("description", "description", "description")}
        multiline
      />
      <FormControl {...getFormAttr("price", "price", "price")} type="number" />
      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default PricingForm;
