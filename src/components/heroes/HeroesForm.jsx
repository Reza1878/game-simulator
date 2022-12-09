import { purgeInitialFormData } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../common";
import { Autocomplete, FormControl } from "../form";
import ImageCropper from "../form/ImageCropper";

const schema = yup.object().shape({
  name: yup.string().required(),
  heroes_role_id: yup
    .number()
    .typeError("This field is required")
    .required("This field is required"),
});

function HeroesForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
  defaultValue = {},
  fetchHeroesRoleData = () => ({ data: [] }),
}) {
  const [initialFormData] = useState(() =>
    purgeInitialFormData(defaultValue, { name: null, heroes_role_id: null })
  );
  const bannerRef = useRef(null);
  const iconRef = useRef(null);
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
    const banner = await bannerRef.current?.getCroppedImage();
    const icon = await iconRef.current?.getCroppedImage();

    const formData = new FormData();
    formData.append("name", val.name);
    formData.append("heroes_role_id", val.heroes_role_id);
    if (icon) formData.append("icon", icon);
    if (banner) formData.append("banner", banner);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <FormControl {...getFormAttr("Name", "name", "name")} />
      <div className="mb-3">
        <Autocomplete
          fetchItems={(params) => fetchHeroesRoleData({ name: params })}
          renderOptions={(opt) => opt?.name}
          {...getFormAttr("Heroes Role", "heroes_role_id", "heroes_role_id")}
          onChange={(val) => {
            setValue("heroes_role_id", val?.id);
          }}
          getOptionSelected={(item) =>
            item?.id === initialFormData?.heroes_role_id
          }
        />
      </div>
      <ImageCropper ref={iconRef} label="Icon" aspect={1 / 1} />
      <ImageCropper
        ref={bannerRef}
        label="Banner"
        aspect={16 / 9}
        cropSize={{ width: 384, height: 112 }}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

export default HeroesForm;
