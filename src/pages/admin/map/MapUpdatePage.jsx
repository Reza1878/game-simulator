import { BasePage } from "@/components/common";
import MapForm from "@/components/maps/MapForm";
import { ROUTE_MAP } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import MapService from "@/service/map-service";
import React from "react";
import { useNavigate } from "react-router-dom";

function MapUpdatePage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const wrappedUpdateMap = useWrap((...params) => MapService.create(...params));
  const { showToast, showInvalidRequestToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedUpdateMap(val);
      showToast(response?.message);
      navigate(ROUTE_MAP);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };
  return (
    <BasePage title="Update Map">
      <MapForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </BasePage>
  );
}

export default MapUpdatePage;
