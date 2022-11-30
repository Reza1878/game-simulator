import { BasePage } from "@/components/common";
import UserTierForm from "@/components/user-tier/UserTierForm";
import { ROUTE_USER_TIER } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import UserTierService from "@/service/user-tier-service";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserTierUpdatePage() {
  const { id } = useParams();
  const wrappedFetchItem = useWrap((id) => UserTierService.get(id));
  const wrappedUpdateItem = useWrap((...args) =>
    UserTierService.update(...args)
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
      navigate(ROUTE_USER_TIER);
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
    <BasePage title="Update User Tier">
      <UserTierForm
        defaultValue={item}
        key={item?.id}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </BasePage>
  );
}

export default UserTierUpdatePage;
