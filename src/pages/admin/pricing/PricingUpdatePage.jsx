import { BasePage } from "@/components/common";
import PricingForm from "@/components/pricing/PricingForm";
import { ROUTE_PRICING_PAGE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import PricingService from "@/service/pricing-service";
import UserTierService from "@/service/user-tier-service";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PricingUpdatePage() {
  const { id } = useParams();
  const wrappedFetchItem = useWrap((id) => PricingService.get(id));
  const wrappedUpdateItem = useWrap((...args) =>
    PricingService.update(...args)
  );
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [item, setItem] = useState(null);
  const { showInvalidRequestToast, showToast } = useToast();
  const navigate = useNavigate();

  const wrappedFetchUserTier = useWrap((...params) =>
    UserTierService.gets(...params)
  );

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await wrappedFetchItem(id);
        if (!active) return;
        setItem(response.data);
      } catch (error) {
        showInvalidRequestToast(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedUpdateItem(id, val);
      setIsSubmitting(false);
      showToast(response.message);

      navigate(ROUTE_PRICING_PAGE);
    } catch (error) {
      showInvalidRequestToast(error);
      console.log(error);
      setIsSubmitting(false);
    }
  };
  if (loading) {
    return <BasePage title="Loading" />;
  }
  if (!loading && !item) {
    return <BasePage title="Not Found" />;
  }
  return (
    <BasePage title="Update Pricing">
      <PricingForm
        defaultValue={item}
        key={item?.id}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        fetchUserTiers={wrappedFetchUserTier}
      />
    </BasePage>
  );
}

export default PricingUpdatePage;
