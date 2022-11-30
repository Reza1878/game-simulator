import { BasePage } from "@/components/common";
import UserTierForm from "@/components/user-tier/UserTierForm";
import { ROUTE_USER_TIER } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import UserTierService from "@/service/user-tier-service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserTierCreatePage() {
  const { showToast, showInvalidRequestToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const wrappedCreateItem = useWrap((...params) =>
    UserTierService.create(...params)
  );

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedCreateItem(val);
      showToast(response?.message);
      navigate(ROUTE_USER_TIER);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };
  return (
    <BasePage title="Create User Tier">
      <UserTierForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </BasePage>
  );
}

export default UserTierCreatePage;
