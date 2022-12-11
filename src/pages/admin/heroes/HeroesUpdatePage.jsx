import { BasePage } from "@/components/common";
import HeroesForm from "@/components/heroes/HeroesForm";
import { ROUTE_HEROES } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import HeroesRoleService from "@/service/heroes-roles-service";
import HeroService from "@/service/heroes-service";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function HeroesUpdatePage() {
  const { id } = useParams();
  const wrappedFetchItem = useWrap((id) => HeroService.get(id));
  const wrappedUpdateItem = useWrap((...args) => HeroService.update(...args));
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showInvalidRequestToast, showToast } = useToast();
  const navigate = useNavigate();

  const wrappedFetchRoleData = useWrap((...params) =>
    HeroesRoleService.gets(...params)
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
      navigate(ROUTE_HEROES);
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
    <BasePage title="Update Hero">
      <HeroesForm
        defaultValue={item}
        key={item?.id}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        fetchHeroesRoleData={wrappedFetchRoleData}
      />
    </BasePage>
  );
}

export default HeroesUpdatePage;
