import { BasePage } from "@/components/common";
import PricingForm from "@/components/pricing/PricingForm";
import { ROUTE_PRICING_PAGE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import PricingService from "@/service/pricing-service";
import UserTierService from "@/service/user-tier-service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PricingCreatePage() {
  const { showToast, showInvalidRequestToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const wrappedCreateItem = useWrap((...params) =>
    PricingService.create(...params)
  );
  const wrappedFetchUserTier = useWrap((...params) =>
    UserTierService.gets(...params)
  );

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedCreateItem(val);
      showToast(response?.message);
      navigate(ROUTE_PRICING_PAGE);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };
  return (
    <BasePage title="Create Pricing">
      <PricingForm
        fetchUserTiers={wrappedFetchUserTier}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </BasePage>
  );
}

export default PricingCreatePage;
