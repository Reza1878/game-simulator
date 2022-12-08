import React from "react";
import style from "./Loader.module.css";

function Loader({ color = "black" }) {
  return (
    <div className={style["lds-ring"]}>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
    </div>
  );
}

export default Loader;
