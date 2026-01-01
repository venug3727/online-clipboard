import React, { useEffect, useRef } from "react";

/**
 * AdBanner Component
 * 
 * This component handles ad display from PropellerAds or other ad networks.
 * Replace the placeholder code with your actual ad code from the ad network.
 * 
 * Usage:
 *   <AdBanner type="banner" /> - Standard banner ad
 *   <AdBanner type="native" /> - Native ad format
 * 
 * To add your PropellerAds code:
 * 1. Go to PropellerAds dashboard → Sites → Get Ad Code
 * 2. Copy the script and zone ID
 * 3. Replace the placeholder values below
 */

// ============================================
// CONFIGURATION - Replace with your actual IDs
// ============================================
const AD_CONFIG = {
    // PropellerAds Zone IDs (get these from your PropellerAds dashboard)
    propellerAds: {
        enabled: false, // Set to true after approval
        zoneId: "YOUR_ZONE_ID_HERE", // Replace with your zone ID
    },

    // Google AdSense (if you want to use it later)
    googleAdsense: {
        enabled: false,
        clientId: "ca-pub-9460974170228372", // Your existing AdSense client ID
        slotId: "YOUR_SLOT_ID_HERE",
    },
};

export default function AdBanner({ type = "banner", className = "" }) {
    const adContainerRef = useRef(null);
    const adLoadedRef = useRef(false);

    useEffect(() => {
        // Prevent double-loading in development (React StrictMode)
        if (adLoadedRef.current) return;

        // Only load ads in production
        if (process.env.NODE_ENV !== "production") {
            return;
        }

        // PropellerAds Integration
        if (AD_CONFIG.propellerAds.enabled) {
            loadPropellerAds();
        }

        // Google AdSense Integration (if enabled)
        if (AD_CONFIG.googleAdsense.enabled) {
            loadGoogleAdsense();
        }

        adLoadedRef.current = true;
    }, []);

    const loadPropellerAds = () => {
        // PropellerAds script loader
        // This will be replaced with actual code from PropellerAds dashboard
        const script = document.createElement("script");
        script.async = true;
        script.src = `//pl.propellerads.com/${AD_CONFIG.propellerAds.zoneId}.js`;

        if (adContainerRef.current) {
            adContainerRef.current.appendChild(script);
        }
    };

    const loadGoogleAdsense = () => {
        // Google AdSense loader
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    };

    // Development placeholder
    if (process.env.NODE_ENV !== "production") {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 
          border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 ${className}`}
                style={{ minHeight: type === "banner" ? "90px" : "250px" }}
            >
                <div className="text-center text-gray-400 dark:text-gray-500">
                    <p className="text-sm font-medium">Ad Placeholder</p>
                    <p className="text-xs">(Only visible in development)</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={adContainerRef}
            className={`ad-container ${className}`}
            style={{ minHeight: type === "banner" ? "90px" : "250px" }}
        >
            {/* PropellerAds will inject ads here */}

            {/* If using Google AdSense instead, uncomment this: */}
            {/* 
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CONFIG.googleAdsense.clientId}
        data-ad-slot={AD_CONFIG.googleAdsense.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
        </div>
    );
}

/**
 * Native Ad Component - For in-content native ads
 */
export function NativeAd({ className = "" }) {
    return <AdBanner type="native" className={className} />;
}

/**
 * Instructions for PropellerAds Setup:
 * 
 * 1. Sign up at https://propellerads.com (choose Publisher)
 * 2. Add your site and wait for approval (24-48 hours)
 * 3. Once approved, go to Sites → Your Site → Get Ad Code
 * 4. Choose ad format (Banner, Native, Push, etc.)
 * 5. Copy the Zone ID from the ad code
 * 6. Update AD_CONFIG.propellerAds.zoneId above
 * 7. Set AD_CONFIG.propellerAds.enabled = true
 * 8. Deploy your site
 * 
 * Example PropellerAds code structure:
 * <script>(function(d,z,s){s.src='//pl.propellerads.com/'+z+'.js';d.body.appendChild(s);})(document,'ZONE_ID',document.createElement('script'))</script>
 */
