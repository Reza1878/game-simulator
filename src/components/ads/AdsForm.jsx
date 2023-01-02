import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { Select } from "../form";
import ImageCropper from "../form/ImageCropper";

const schema = yup.object().shape({
  ratio: yup.string().required("This field is required"),
});

function AdsForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
}) {
  const ratioOptions = [
    { label: "1 / 1", ratio: 1 / 1 },
    { label: "16 / 9", ratio: 16 / 9 },
  ];
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, { ratio: null })
  );
  const initRatioOptions = useMemo(() => {
    const current = ratioOptions.filter(
      (item) => item.label === defaultValue?.ratio
    )[0];
    return current;
  }, [ratioOptions, defaultValue]);
  const [ratio, setRatio] = useState(() => {
    const current = ratioOptions.filter(
      (item) => item.label === defaultValue?.ratio
    )[0];
    if (current) {
      return current.ratio;
    }
    return null;
  });

  const imageRef = useRef(null);

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

  const submitData = async (val) => {
    const image = await imageRef.current?.getCroppedImage();
    const formData = new FormData();
    formData.append("ratio", val.ratio);
    if (image) formData.append("image", image);
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className="mb-3">
        <Select
          options={ratioOptions}
          {...getFormAttr("Image Ratio", "ratio", "ratio")}
          renderOptions={(opt) => opt.label}
          onChange={(val) => {
            setValue("ratio", val?.label);
            setRatio(val?.ratio);
          }}
          defaultValue={initRatioOptions}
          getOptionSelected={(item) => item.label === initialFormData?.ratio}
        />
      </div>
      <ImageCropper
        ref={imageRef}
        aspect={ratio ? ratio : 1 / 1}
        label="Image"
      />
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

export default AdsForm;
