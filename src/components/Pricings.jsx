import AuthModalContext from "@/context/AuthModalContext";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import PricingService from "@/service/pricing-service";
import SubscriptionService from "@/service/subscription-service";
import styles from "@/style";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text } from "./common";
import PricingItem from "./PricingItem";

function Pricings() {
  const [pricings, setPricings] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { setAuthForm, setShowAuthModal } = useContext(AuthModalContext);
  const { showInvalidRequestToast } = useToast();

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const response = await PricingService.gets();
      if (!active) return;
      setPricings(response.data);
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const wrappedCreateItemm = useWrap((...params) =>
    SubscriptionService.create(...params)
  );

  const handleClick = async (id) => {
    if (!accessToken) {
      setAuthForm("LOGIN");
      setShowAuthModal(true);
      return;
    }
    try {
      const response = await wrappedCreateItemm({ pricing_id: id });
      const { data } = response;
      window.location = data.url;
    } catch (error) {
      showInvalidRequestToast(error);
      console.log(error);
    }
  };
  return (
    <section id="pricings" className={clsx(styles.paddingY)}>
      <div className="w-full flex flex-col">
        <Text className={styles.heading2}>Designed for gamers like you</Text>
        <Text className="text-dimWhite mb-4">
          Require an enterprise subscription as a big Esports organisation ? Contact us 
          here at business@feggot.com
        </Text>

        <div className="lg:grid lg:grid-cols-3 sm:gap-6 lg:gap-10 lg:space-y-0 space-y-8">
          {pricings.map((item) => (
            <PricingItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              loading={loading}
              onClick={handleClick}
              id={item.id}
              features={(item?.features || "").split(",")}
              interval={item.interval}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricings;
