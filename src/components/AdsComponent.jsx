import React, { useEffect } from "react";

function AdsComponent({ dataAdSlot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      var adBreak = (adConfig = function (o) {
        adsbygoogle.push(o);
      });
    } catch (e) {}
  }, []);
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1956379516977434"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
}

export default AdsComponent;
