import BanAmountForm from "@/components/ban-amount/BanAmountForm";
import { BasePage } from "@/components/common";
import { ROUTE_BAN_AMOUNT_PAGE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import BanAmountService from "@/service/ban-amount-service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BanAmountCreatePage() {
  const { showToast, showInvalidRequestToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const wrappedCreateItem = useWrap((...params) =>
    BanAmountService.create(...params)
  );

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedCreateItem(val);
      showToast(response?.message);
      navigate(ROUTE_BAN_AMOUNT_PAGE);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };
  return (
    <BasePage title="Create Ban Amount">
      <BanAmountForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </BasePage>
  );
}

export default BanAmountCreatePage;
