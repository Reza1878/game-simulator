import { BasePage } from "@/components/common";
import SettingsForm from "@/components/settings/SettingsForm";
import { ROUTE_SETTINGS } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import SettingService from "@/service/settings-service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SettingUpdatePage() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showInvalidRequestToast, showToast } = useToast();
  const navigate = useNavigate();
  const wrappedFetchItem = useWrap(SettingService.gets);
  const wrappedUpdateItem = useWrap((...params) =>
    SettingService.update(...params)
  );

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await wrappedFetchItem();
        if (!active) return;
        setItem(response.data || {});
      } catch (error) {
        console.log(error);
        // showInvalidRequestToast(error);
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
      const response = await wrappedUpdateItem(val);
      showToast("Success update settings");
      setIsSubmitting(false);
      navigate(ROUTE_SETTINGS);
    } catch (error) {
      setIsSubmitting(false);
      showInvalidRequestToast(error);
    }
  };

  if (loading) {
    return <BasePage title="Loading" />;
  }
  return (
    <BasePage title="Update Settings">
      <SettingsForm
        key={item?.id}
        defaultValue={item}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </BasePage>
  );
}

export default SettingUpdatePage;
