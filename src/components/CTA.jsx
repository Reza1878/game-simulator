import useToast from "@/hooks/useToast";
import SettingService from "@/service/settings-service";
import { useState } from "react";
import styles from "../style";
import { Button } from "./common";

const CTA = () => {
  const [loading, setLoading] = useState(false);
  const { showInvalidRequestToast } = useToast();

  const handleDonationClick = async () => {
    try {
      setLoading(true);
      const { data } = await SettingService.gets();
      if (!data) throw new Error("Donation link not found");
      window.location = data.donation_link;
      setLoading(false);
    } catch (error) {
      showInvalidRequestToast(error);
      setLoading(false);
    }
  };
  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
      <div className="flex-1 flex flex-col">
        <h2 className={styles.heading2}>Request backup!</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Do help to donate on your own comfort amount for us to develop more
          functions!
        </p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button
          onClick={handleDonationClick}
          variant="filled"
          color="blue-gradient"
          isLoading={loading}
        >
          Donate
        </Button>
      </div>
    </section>
  );
};

export default CTA;
