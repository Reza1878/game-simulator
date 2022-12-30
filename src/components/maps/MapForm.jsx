import useToast from "@/hooks/useToast";
import React from "react";
import { Button } from "../common";
import ImageCropper from "../form/ImageCropper";

function MapForm({
  onSubmit = (val) => console.log(val),
  isSubmitting = false,
}) {
  const mapRef = React.useRef(null);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await mapRef.current?.getCroppedImage();
    if (!image) {
      showToast("Image is required", "error");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ImageCropper ref={mapRef} label="Map" aspect={1 / 1} />
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}

export default MapForm;
