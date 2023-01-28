import { BasePage, ItemDisplay } from "@/components/common";
import { ROUTE_SETTINGS } from "@/config/routes";
import { useWrap } from "@/hooks/useWrap";
import SettingService from "@/service/settings-service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SettingsItemPage() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const attrAndLabel = [{ label: "Email", key: "email" }];

  const wrappedFetchItem = useWrap(SettingService.gets);

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

  if (loading) {
    return <BasePage title="Loading" />;
  }

  return (
    <BasePage title="Settings">
      <ItemDisplay
        data={item}
        attrAndLabels={attrAndLabel}
        showEdit
        onClickEdit={() => navigate(`${ROUTE_SETTINGS}/edit`)}
      />
    </BasePage>
  );
}

export default SettingsItemPage;
