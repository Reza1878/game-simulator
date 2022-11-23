import { BasePage } from "@/components/common";
import HeroesRoleForm from "@/components/heroes-roles/HeroesRoleForm";
import { ROUTE_HEROES_ROLE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import HeroesRoleService from "@/service/heroes-roles-service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroesRoleCreatePage() {
  const { showToast, showInvalidRequestToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const wrappedCreateItem = useWrap((...params) =>
    HeroesRoleService.create(...params)
  );

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedCreateItem(val);
      showToast(response?.message);
      navigate(ROUTE_HEROES_ROLE);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };
  return (
    <BasePage title="Create Heroes Role">
      <HeroesRoleForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </BasePage>
  );
}

export default HeroesRoleCreatePage;
