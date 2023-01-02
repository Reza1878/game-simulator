import AdsForm from "@/components/ads/AdsForm";
import { BasePage } from "@/components/common";
import { ROUTE_ADS } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import AdService from "@/service/ads-service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdsCreatePage() {
  const { showToast, showInvalidRequestToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const wrappedCreateItem = useWrap((...params) => AdService.create(...params));

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedCreateItem(val);
      showToast(response?.message);
      navigate(ROUTE_ADS);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };
  return (
    <BasePage title="Create Ads">
      <AdsForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </BasePage>
  );
}

export default AdsCreatePage;
