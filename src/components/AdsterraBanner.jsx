import React, { useEffect, useRef } from "react";

/**
 * AdsterraBanner Component
 * 
 * Display Adsterra banner ads (160x300 iframe format)
 * Place this component in sidebars or between content sections
 */

const ADSTERRA_CONFIG = {
    key: '2e3cb0f20f1fdf51577f92e3e6bf38a0',
    format: 'iframe',
    height: 300,
    width: 160,
};

export default function AdsterraBanner({ className = "" }) {
    const adContainerRef = useRef(null);
    const adLoadedRef = useRef(false);

    useEffect(() => {
        // Prevent double-loading
        if (adLoadedRef.current) return;

        // Only load ads in production
        if (process.env.NODE_ENV !== "production") {
            return;
        }

        // Create Adsterra ad
        if (adContainerRef.current) {
            // Set global options
            window.atOptions = {
                'key': ADSTERRA_CONFIG.key,
                'format': ADSTERRA_CONFIG.format,
                'height': ADSTERRA_CONFIG.height,
                'width': ADSTERRA_CONFIG.width,
                'params': {}
            };

            // Load the invoke script
            const script = document.createElement("script");
            script.src = `https://www.highperformanceformat.com/${ADSTERRA_CONFIG.key}/invoke.js`;
            script.async = true;
            adContainerRef.current.appendChild(script);
        }

        adLoadedRef.current = true;
    }, []);

    // Development placeholder
    if (process.env.NODE_ENV !== "production") {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 
          border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 ${className}`}
                style={{ width: ADSTERRA_CONFIG.width, height: ADSTERRA_CONFIG.height }}
            >
                <div className="text-center text-gray-400 dark:text-gray-500">
                    <p className="text-xs font-medium">Adsterra</p>
                    <p className="text-xs">160×300</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={adContainerRef}
            className={`adsterra-banner ${className}`}
            style={{
                width: ADSTERRA_CONFIG.width,
                height: ADSTERRA_CONFIG.height,
                overflow: 'hidden'
            }}
        />
    );
}

/**
 * Horizontal Adsterra Banner - for header/footer areas
 * You can add more banner sizes here when you get them from Adsterra
 */
export function AdsterraHorizontal({ className = "" }) {
    // This is a placeholder - add your horizontal banner code from Adsterra dashboard
    return <AdsterraBanner className={className} />;
}
