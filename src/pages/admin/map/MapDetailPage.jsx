import { BasePage, ItemDisplay, Loader } from "@/components/common";
import { ROUTE_MAP } from "@/config/routes";
import MapService from "@/service/map-service";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MapDetailPage() {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const response = await MapService.gets();
      if (!active) return;
      console.log({ response });
      setLoading(false);
      setItem(response.data);
    })();

    return () => {
      active = false;
    };
  }, []);

  const attrAndLabels = [
    {
      label: "Map Image",
      key: "image_url",
      display: (val) =>
        !val ? (
          "No image available"
        ) : (
          <img
            className="w-64 h-64"
            src={`${import.meta.env.VITE_BASE_URL}/${val}`}
          />
        ),
    },
  ];

  const onConfirmEdit = () => {
    navigate(`${ROUTE_MAP}/edit`);
  };

  return (
    <BasePage title="Maps">
      {loading ? (
        <Loader />
      ) : (
        <ItemDisplay
          onClickEdit={onConfirmEdit}
          showEdit
          data={item}
          attrAndLabels={attrAndLabels}
        />
      )}
    </BasePage>
  );
}

export default MapDetailPage;
