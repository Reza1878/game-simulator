import AuthModalContext from "@/context/AuthModalContext";
import { useContext } from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import { Button } from "./common";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img
        src={icon}
        alt="star"
        className="w-[50%] h-[50%] object-contain"
        loading="lazy"
      />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  const { setAuthForm, setShowAuthModal } = useContext(AuthModalContext);

  const handleClick = () => {
    setAuthForm("REGISTER");
    setShowAuthModal(true);
  };

  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          You play the game, <br className="sm:block hidden" /> You learn the
          game
          <p className="font-poppins font-medium text-[64px] ml-10">
            <span className="text-gradient">with effeg !</span>
          </p>
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          One stop website where you can get all the help you need. Looking to
          improve on your individual gameplay or competition is coming and need
          some assistant with drafting or drawing tools for discussion ? you are
          at the right place!
        </p>

        <Button
          variant="filled"
          color="blue-gradient"
          styles={`mt-10`}
          onClick={handleClick}
        >
          Get Started
        </Button>
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
