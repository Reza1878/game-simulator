import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { FormControl } from "../form";
import ImageCropper from "../form/ImageCropper";

const schema = yup.object().shape({
  name: yup.string().required("This field is required"),
});

function IconForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, { name: null })
  );
  const imageRef = useRef(null);
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
  const submitData = async (val) => {
    const image = await imageRef.current?.getCroppedImage();
    const formData = new FormData();
    formData.append("name", val.name);
    if (image) formData.append("image", image);
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <FormControl {...getFormAttr("Name", "name", "name")} />
      <ImageCropper ref={imageRef} aspect={1 / 1} label="Image" />
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

export default IconForm;
