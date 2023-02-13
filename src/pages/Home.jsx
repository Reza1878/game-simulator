import { Business, Clients, CTA, Hero, Stats } from "@/components";
import styles from "@/style";
import React from "react";

function Home() {
  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Business />
          <Clients />
          <CTA />
        </div>
      </div>
    </>
  );
}

export default Home;
