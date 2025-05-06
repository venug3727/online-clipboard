import React, { useState, useRef, useEffect } from "react";
import { QrCode, Download, Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { Helmet } from "react-helmet";
import AdSenseAd from "../components/AdSenseAd";
export default function QRGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrValue, setQrValue] = useState("https://bmsclipboard.netlify.app");
  const [darkMode, setDarkMode] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const qrRef = useRef(null);

  // Load ads when component mounts and when QR code is generated
  useEffect(() => {
    if (
      qrValue &&
      qrValue !== "https://bmsclipboard.netlify.app" &&
      !adLoaded
    ) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [qrValue, adLoaded]);

  const generateQR = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setQrValue(inputText);
    }
  };

  const downloadQR = () => {
    if (qrRef.current) {
      const svg = qrRef.current.querySelector("svg");
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "bmsclipboard-qr.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
  };

  return (
    <>
      <Helmet>
        <title>Free QR Code Generator | ClipVault</title>
        <meta
          name="description"
          content="Create custom QR codes for URLs, contact info, WiFi credentials, and more. No registration required."
        />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          QR Code Generator
        </h1>

        {/* Educational Content Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            What Can You Create QR Codes For?
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>
              <strong>Website URLs:</strong> Drive traffic to your site
            </li>
            <li>
              <strong>Contact Cards:</strong> Share your contact info instantly
            </li>
            <li>
              <strong>WiFi Access:</strong> Generate codes for your guest
              network
            </li>
            <li>
              <strong>Payment Links:</strong> Create QR codes for PayPal, Venmo,
              etc.
            </li>
            <li>
              <strong>Event Details:</strong> Share event locations and info
            </li>
          </ul>
        </div>

        {/* First Ad Unit */}
        <AdSenseAd slotId="1101018584" />

        {/* MAIN FORM (keep existing UI) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <form onSubmit={generateQR} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text or URL"
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
              >
                Generate
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center">
            <div ref={qrRef} className="p-4 bg-white rounded-lg mb-4">
              <QRCode
                value={qrValue}
                size={200}
                level="H"
                marginSize={2}
                fgColor={darkMode ? "#ffffff" : "#000000"}
                bgColor={darkMode ? "#1f2937" : "#ffffff"}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={downloadQR}
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg"
              >
                <Copy className="h-5 w-5 mr-2" />
                Copy Text
              </button>
            </div>
          </div>
        </div>

        {/* Second Ad Unit */}
        {inputText && qrValue !== "https://bmsclipboard.netlify.app" && (
          <AdSenseAd slotId="7843256991" />
        )}

        {/* Advanced Options Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Advanced QR Code Tips
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Error Correction:</strong> Higher levels (like "H" used
              here) allow the QR code to still work when up to 30% damaged
            </li>
            <li>
              <strong>Custom Colors:</strong> Use contrasting colors for better
              scan reliability (dark on light or vice versa)
            </li>
            <li>
              <strong>Size Matters:</strong> Larger QR codes are easier to scan
              from farther away or on mobile devices
            </li>
          </ul>
        </div>

        {/* Use Cases Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Professional QR Code Uses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Business Cards
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add a QR code linking to your portfolio, LinkedIn, or contact
                info.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Restaurant Menus
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Let customers view digital menus by scanning a code at their
                table.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Product Packaging
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Link to user manuals, warranty info, or product demos.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Event Tickets
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Include unique QR codes for ticket validation and entry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
