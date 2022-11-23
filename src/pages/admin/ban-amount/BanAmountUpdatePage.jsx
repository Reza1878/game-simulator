import BanAmountForm from "@/components/ban-amount/BanAmountForm";
import { BasePage } from "@/components/common";
import { ROUTE_BAN_AMOUNT_PAGE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import BanAmountService from "@/service/ban-amount-service";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BanAmountUpdatePage() {
  const { id } = useParams();
  const wrappedFetchItem = useWrap((id) => BanAmountService.get(id));
  const wrappedUpdateItem = useWrap((...args) =>
    BanAmountService.update(...args)
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
      navigate(ROUTE_BAN_AMOUNT_PAGE);
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
    <BasePage title="Update Ban Amount">
      <BanAmountForm
        defaultValue={item}
        key={item?.id}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </BasePage>
  );
}

export default BanAmountUpdatePage;
