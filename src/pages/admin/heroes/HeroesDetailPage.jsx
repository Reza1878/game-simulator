import { BasePage, ItemDisplay } from "@/components/common";
import HeroesBanner from "@/components/heroes/HeroesBanner";
import HeroesIcon from "@/components/heroes/HeroesIcon";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import HeroService from "@/service/heroes-service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HeroesDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const { showInvalidRequestToast } = useToast();
  const wrappedFetchItem = useWrap((id) => HeroService.get(id));

  const attrAndLabel = [
    { label: "Name", key: "name" },
    {
      label: "Role",
      key: "heroes_roles",
      display: (val) => val?.map((item) => item?.name).join(", ") || "-",
    },
    {
      label: "Icon",
      key: "icon_url",
      display: (val) => (
        <HeroesIcon className="border border-gray-400" url={val} />
      ),
    },
    {
      label: "Banner",
      key: "banner_url",
      display: (val) => (
        <HeroesBanner url={val} className="border border-gray-400" />
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
    <BasePage title="Heroes Detail">
      <ItemDisplay data={item} attrAndLabels={attrAndLabel} />
    </BasePage>
  );
}

export default HeroesDetailPage;
