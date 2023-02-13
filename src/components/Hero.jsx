import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
// import { motion } from "framer-motion";

const Hero = () => {
  // const transition = { duration: 2, type: "spring" };
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.padding}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-10 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[62px] text-[50px] text-white ss:leading-[65.8px] leading-[75px]">
            The Only Mobile Legends
            <span className="text-gradient"> Tools</span>{" "}
          </h1>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[42px] text-white ss:leading-[80.8px] leading-[55px] w-full">
          You will ever need
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Not sure about how the opponent might draft in the upcoming tournament
          ? Use this feature and get into some scenarios with your teammates!
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={robot}
          alt="billing"
          className="w-[100%] h-[100%] relative z-[5] ms-auto"
          loading="lazy"
          width={530}
          height={534}
        />

        {/* gradient start */}
        {/* <motion.div
          initial={{ bottom: "40rem" }}
          whileInView={{ bottom: "0rem" }}
          className="absolute z-[0] w-[40%] h-[30%] top-0 pink__gradient"
          transition={transition}
        />
        <motion.div
          initial={{ top: "30rem" }}
          whileInView={{ top: "0rem" }}
          className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient"
          transition={transition}
        />
        <motion.div
          initial={{ right: "40rem" }}
          whileInView={{ left: "0rem" }}
          className="absolute z-[0] w-[50%] h-[50%] blue__gradient"
          transition={transition}
        /> */}
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
