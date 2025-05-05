import React, { useState, useEffect } from "react";
import { Moon, Clock, CreditCard } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";

// const AdSenseAd = ({ slotId }) => {
//   useEffect(() => {
//     try {
//       // Only push if adsbygoogle is loaded and this ad hasn't been pushed
//       if (window.adsbygoogle && !window.adsbygoogle.loaded) {
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//       }
//     } catch (e) {
//       console.error("AdSense error:", e);
//     }
//   }, []);

//   return (
//     <div className="mb-8 text-center">
//       <p className="text-sm text-gray-500 mb-2">Sponsored Content</p>
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client="ca-pub-9460974170228372"
//         data-ad-slot={slotId}
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       ></ins>
//     </div>
//   );
// };

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [autoClearMinutes, setAutoClearMinutes] = useState(15);
  const [isProUser, setIsProUser] = useState(false);

  // Manually load AdSense script without React Helmet
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372";
  //   script.async = true;
  //   script.crossOrigin = "anonymous";
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>BMSClipboard | Settings for BMSCE/BMSIT Users</title>
        <meta name="application-name" content="BMSClipboard" />
        <meta name="apple-mobile-web-app-title" content="BMSClipboard" />
        <meta
          name="description"
          content="Customize your BMSClipboard experience with settings for BMSCE and BMSIT students."
        />
        <meta
          name="keywords"
          content="BMSClipboard, BMSCE, BMSIT, settings, dark mode, auto-clear, pro features, BMS College of Engineering, BMS Institute of Technology"
        />
        <meta name="author" content="BMS Development Team" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="BMSClipboard Settings" />
        <meta
          itemProp="description"
          content="Customize your clipboard experience for BMSCE/BMSIT students"
        />
        <meta
          itemProp="image"
          content="https://bmsclipboard.netlify.app/settings-preview.png"
        />

        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content="https://bmsclipboard.netlify.app/settings"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BMSClipboard Settings" />
        <meta
          property="og:description"
          content="Customize your clipboard settings for BMSCE/BMSIT community"
        />
        <meta
          property="og:image"
          content="https://bmsclipboard.netlify.app/settings-preview.png"
        />
        <meta property="og:site_name" content="BMSClipboard" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMSClipboard Settings" />
        <meta
          name="twitter:description"
          content="Customize your clipboard settings for BMSCE/BMSIT community"
        />
        <meta
          name="twitter:image"
          content="https://bmsclipboard.netlify.app/settings-preview.png"
        />
        <meta name="twitter:site" content="@BMSClipboard" />
        <meta name="twitter:creator" content="@BMSClipboard" />

        {/* Institution Specific Tags */}
        <meta name="institution" content="BMSCE, BMSIT" />
        <meta name="campus" content="Bangalore" />
        <meta name="organization" content="BMS Educational Trust" />
      </Helmet>

      <div className="max-w-2xl h-screen mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-1" />
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Auto-clear Timer
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Automatically clear clipboard content after specified time
                </p>
                <select
                  value={autoClearMinutes}
                  onChange={(e) => setAutoClearMinutes(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value={5}>5 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </div>
            </div>
          </div>

          {/* AdSense Ad Unit */}
          {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <AdSenseAd slotId="1101018584" />
          </div> */}
        </div>
      </div>
    </>
  );
}
