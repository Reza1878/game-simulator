import { BasePage } from "@/components/common";
import HeroesRoleForm from "@/components/heroes-roles/HeroesRoleForm";
import { ROUTE_HEROES_ROLE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import HeroesRoleService from "@/service/heroes-roles-service";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function HeroesRoleUpdatePage() {
  const { id } = useParams();
  const wrappedFetchItem = useWrap((id) => HeroesRoleService.get(id));
  const wrappedUpdateItem = useWrap((...args) =>
    HeroesRoleService.update(...args)
  );
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [item, setItem] = useState(null);
  const { showInvalidRequestToast, showToast } = useToast();
  const navigate = useNavigate();

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
      navigate(ROUTE_HEROES_ROLE);
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
    <BasePage title="Update Heroes Role">
      <HeroesRoleForm
        defaultValue={item}
        key={item?.id}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </BasePage>
  );
}

export default HeroesRoleUpdatePage;
