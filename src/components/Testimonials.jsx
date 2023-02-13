import React from "react";
import { TestimonialsData } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../style";

const Testimonials = () => {
  return (
    <section
      id="testimonial"
      className={`${styles.padding} flex-row flex-wrap sm:mb-20 mb-3`}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        loopFillGroupWithBlank={true}
        slidesPerView={3}
        spaceBetween={40}
        slidesPerGroup={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          856: { slidesPerView: 3 },
          640: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {TestimonialsData.map((slide) => (
          <SwiperSlide>
            <div className="font-poppins font-normal cursor-pointer text-[16px] text-white leading-[25px]">
              <span>
                {slide.name}
                <br />
              </span>
              <span> {slide.comment} </span>
              <center>
                <img src={slide.image} alt="player face" />
              </center>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;

// import { feedback } from "../constants";
// import styles from "../style";
// import FeedbackCard from "./FeedbackCard";

// const Testimonials = () => {
//   return (
//   <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
//     <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

//         {/* gradient start */}
//         <div className="absolute z-[0] w-[400%] h-[35%] top-0 green__gradient" />
//         <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
//         <div className="absolute z-[0] w-[60%] h-[50%] right-20 bottom-20 blue__gradient" />
//         {/* gradient end */}

//     <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
//       {feedback.map((card) => <FeedbackCard key={card.id} {...card} />)}
//     </div>
//   </section>

//   );
// };

// export default Testimonials;
