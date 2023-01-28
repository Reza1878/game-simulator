import React from "react";

const Button = ({ styles }) => (
  <a href="https://effeg.gg/pricing" target="_blank" rel="noreferrer">
  <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    Donate
  </button>
 </a>
);

export default Button;