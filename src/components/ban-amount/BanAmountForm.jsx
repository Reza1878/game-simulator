import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { purgeInitialFormData } from "@/utils/form";
import { Button } from "../common";
import { FormControl } from "../form";
import { BASE_BAN_AMOUNT_BLANK_PAGE } from "./constants";

const schema = yup.object({
  ban_count: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Must be greater than 0"),
});
function BanAmountForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, BASE_BAN_AMOUNT_BLANK_PAGE)
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
      <FormControl
        {...getFormAttr("Ban Amount", "ban_count", "ban_count")}
        type="number"
        min={0}
      />
      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default BanAmountForm;
