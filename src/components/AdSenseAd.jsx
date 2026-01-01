import React, { useEffect, useRef } from "react";

const AdSenseAd = ({
  slot,
  format = "auto",
  responsive = true,
  style = {},
  className = ""
}) => {
  const adRef = useRef(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Only push ad once
    if (adRef.current && !isLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={{ minHeight: "100px", ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9460974170228372"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdSenseAd;
