// src/components/AdSenseAd.jsx
import React, { useEffect } from "react";

const AdSenseAd = ({
  slotId,
  format = "auto",
  layout = "",
  className = "",
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && !window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9460974170228372"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
