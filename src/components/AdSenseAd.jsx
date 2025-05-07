// src/components/AdSenseAd.jsx
import React, { useEffect } from "react";

const AdSenseAd = ({ slotId, className = "" }) => {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== "production") return;

    try {
      // Check if script is already loaded
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement("script");
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }

      // Push the ad when component mounts
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
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
