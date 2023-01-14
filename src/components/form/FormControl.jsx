import React from "react";
import * as t from "prop-types";
import Label from "./Label";
import { TextField } from ".";

import clsx from "clsx";
import Text from "../common/Text";

function FormControl({
  label,
  name,
  id,
  type,
  error,
  helperText,
  register,
  multiline,
  InputProps,
  className,
  LabelProps,
}) {
  return (
    <div className={clsx("mb-3", className)}>
      <Label {...LabelProps} htmlFor={id} error={error}>
        {label}
      </Label>
      <TextField
        name={name}
        error={error}
        type={type}
        id={id}
        register={register}
        multiline={multiline}
        {...InputProps}
      />
      {helperText && <Text className="text-red-500">{helperText}</Text>}
    </div>
  );
}

FormControl.propTypes = {
  label: t.string,
  name: t.string,
  id: t.string,
  error: t.bool,
  helperText: t.string,
  register: t.func,
  multiline: t.bool,
  onChange: t.func,
  className: t.string,
  value: t.any,
};

FormControl.defaultProps = {
  name: "",
  id: "",
  error: false,
  onChange: () => {},
  className: "",
  value: undefined,
};

export default FormControl;
