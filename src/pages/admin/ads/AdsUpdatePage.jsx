import AdsForm from "@/components/ads/AdsForm";
import { BasePage } from "@/components/common";
import { ROUTE_ADS } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import AdService from "@/service/ads-service";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AdsUpdatePage() {
  const { id } = useParams();
  const wrappedFetchItem = useWrap((id) => AdService.get(id));
  const wrappedUpdateItem = useWrap((...args) => AdService.update(...args));
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      navigate(ROUTE_ADS);
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
    <BasePage title="Update Ads">
      <AdsForm
        defaultValue={item}
        key={item?.id}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </BasePage>
  );
}

export default AdsUpdatePage;
