import AdsImage from "@/components/ads/AdsImage";
import { BasePage, ItemDisplay } from "@/components/common";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import AdService from "@/service/ads-service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdsDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const { showInvalidRequestToast } = useToast();
  const wrappedFetchItem = useWrap((id) => AdService.get(id));

  const attrAndLabel = [
    { label: "Ratio", key: "ratio" },
    {
      label: "Image",
      key: "image_url",
      display: (val) => <AdsImage ratio={item?.ratio} url={val} />,
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
    <BasePage title="Ads Detail">
      <ItemDisplay data={item} attrAndLabels={attrAndLabel} />
    </BasePage>
  );
}

export default AdsDetailPage;
