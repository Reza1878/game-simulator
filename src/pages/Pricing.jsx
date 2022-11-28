import { Pricings } from "@/components";
import styles from "@/style";
import React from "react";

function Pricing() {
  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <Pricings />
    </div>
  );
}

export default Pricing;
