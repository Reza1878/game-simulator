import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { Autocomplete, FormControl, Select } from "../form";
import { BASE_PRICING_BLANK_PAGE } from "./constants";

const schema = yup.object({
  name: yup.string().required("This field is required").min(3),
  description: yup.string().required("This field is required"),
  price: yup
    .number()
    .typeError("Must be a number")
    .required("This field is required"),
  features: yup.string().required("This field is required"),
});

function PricingForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
  fetchUserTiers = () => ({ data: [] }),
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, BASE_PRICING_BLANK_PAGE)
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
        {...getFormAttr("Description", "description", "description")}
        multiline
      />
      <FormControl {...getFormAttr("Price", "price", "price")} type="number" />
      <FormControl
        {...getFormAttr("Features (Separate by comma)", "features", "features")}
      />
      <div className="mb-3">
        <Select
          {...getFormAttr("Interval", "interval", "interval")}
          options={["month", "year"]}
          getOptionSelected={(item) => item === defaultValue?.interval}
          onChange={(val) => setValue("interval", val)}
        />
      </div>
      <div className="mb-3">
        <Autocomplete
          {...getFormAttr("User Tier", "user_tier_id", "user_tier_id")}
          fetchItems={(param) => fetchUserTiers({ name: param })}
          renderOptions={(opt) => opt?.name}
          getOptionSelected={(item) => item?.id === defaultValue?.user_tier_id}
          onChange={(val) => setValue("user_tier_id", val?.id)}
        />
      </div>
      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default PricingForm;
