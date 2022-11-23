import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { FormControl, Select } from "../form";
import { TEAM_BASE_BLANK_FORM } from "./constants";

const schema = yup.object({
  name: yup.string().required("This field is required"),
  side: yup.string().required("This field is required"),
});

function TeamForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, TEAM_BASE_BLANK_FORM)
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
      <div className="mb-3">
        <Select
          {...getFormAttr("Side", "side", "side")}
          getOptionSelected={(item) => item === initialFormData?.side}
          onChange={(val) => {
            setValue("side", val);
          }}
          options={["LEFT", "RIGHT"]}
        />
      </div>
      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default TeamForm;
