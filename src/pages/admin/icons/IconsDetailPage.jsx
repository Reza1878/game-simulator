import { BasePage, ItemDisplay } from "@/components/common";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import IconsService from "@/service/icons-service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IconsDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const { showInvalidRequestToast } = useToast();
  const wrappedFetchItem = useWrap((id) => IconsService.get(id));

  const attrAndLabel = [
    { label: "Name", key: "name" },
    {
      label: "Image",
      key: "image_url",
      display: (val) => (
        <img
          className="w-24 h-24 object-cover"
          src={`${import.meta.env.VITE_BASE_URL}/${val}`}
        />
      ),
    },
  ];

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

  if (loading) {
    return <BasePage title="Loading" />;
  }
  if (!loading && !item) {
    return <BasePage title="Not Found" />;
  }
  return (
    <BasePage title="Icon Detail">
      <ItemDisplay data={item} attrAndLabels={attrAndLabel} />
    </BasePage>
  );
}

export default IconsDetailPage;
