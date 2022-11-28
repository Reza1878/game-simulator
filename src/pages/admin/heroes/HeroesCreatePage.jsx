import { BasePage } from "@/components/common";
import HeroesForm from "@/components/heroes/HeroesForm";
import { ROUTE_HEROES } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import HeroesRoleService from "@/service/heroes-roles-service";
import HeroService from "@/service/heroes-service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroesCreatePage() {
  const { showToast, showInvalidRequestToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const wrappedCreateItem = useWrap((...params) =>
    HeroService.create(...params)
  );

  const wrappedFetchRoleData = useWrap((...params) =>
    HeroesRoleService.gets(...params)
  );

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      const response = await wrappedCreateItem(val);
      showToast(response?.message);
      navigate(ROUTE_HEROES);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };
  return (
    <BasePage title="Create Heroes">
      <HeroesForm
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        fetchHeroesRoleData={wrappedFetchRoleData}
      />
    </BasePage>
  );
}

export default HeroesCreatePage;
