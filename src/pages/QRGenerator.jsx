import React, { useState, useRef, useEffect } from "react";
import { QrCode, Download, Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { Helmet } from "react-helmet";

export default function QRGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrValue, setQrValue] = useState("https://bmsclipboard.netlify.app");
  const [darkMode, setDarkMode] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const qrRef = useRef(null);

  // Load ads when component mounts and when QR code is generated
  useEffect(() => {
    if (qrValue && qrValue !== "https://bmsclipboard.netlify.app" && !adLoaded) {
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
        {/* Primary Meta Tags */}
        <title>BMSClipboard | QR Code Generator for BMSCE/BMSIT</title>
        <meta name="application-name" content="BMSClipboard" />
        <meta name="apple-mobile-web-app-title" content="BMSClipboard" />
        <meta
          name="description"
          content="Generate QR codes instantly for BMSCE and BMSIT students with BMSClipboard's secure QR code generator."
        />
        <meta
          name="keywords"
          content="BMSClipboard, BMSCE, BMSIT, QR code generator, BMS College of Engineering, BMS Institute of Technology, secure QR codes, quick sharing"
        />
        <meta name="author" content="BMS Development Team" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="BMSClipboard QR Generator" />
        <meta itemProp="description" content="Secure QR code generator for BMSCE/BMSIT students and faculty" />
        <meta itemProp="image" content="https://bmsclipboard.netlify.app/qr-generator-preview.png" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://bmsclipboard.netlify.app/qr-generator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BMSClipboard QR Generator" />
        <meta property="og:description" content="Generate QR codes for BMSCE/BMSIT community" />
        <meta property="og:image" content="https://bmsclipboard.netlify.app/qr-generator-preview.png" />
        <meta property="og:site_name" content="BMSClipboard" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMSClipboard QR Generator" />
        <meta name="twitter:description" content="Generate QR codes for BMSCE/BMSIT community" />
        <meta name="twitter:image" content="https://bmsclipboard.netlify.app/qr-generator-preview.png" />
        <meta name="twitter:site" content="@BMSClipboard" />
        <meta name="twitter:creator" content="@BMSClipboard" />
        
        {/* Institution Specific Tags */}
        <meta name="institution" content="BMSCE, BMSIT" />
        <meta name="campus" content="Bangalore" />
        <meta name="organization" content="BMS Educational Trust" />
        
        {/* Google Ads Script - Only loads when there's content */}
        {qrValue && qrValue !== "https://bmsclipboard.netlify.app" && (
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372" crossOrigin="anonymous"></script>
        )}
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          QR Code Generator
        </h1>

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

        {/* AdSense Ad Unit - Only shows when QR code is generated */}
        {qrValue && qrValue !== "https://bmsclipboard.netlify.app" && (
          <div className="my-8">
            <p className="text-xs text-gray-500 text-center mb-1">Advertisement</p>
            <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-9460974170228372"
              data-ad-slot="1101018584" // Replace with your actual ad slot ID
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            How to use
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Enter any text or URL in the input field</li>
            <li>Click "Generate" to create your QR code</li>
            <li>Download the QR code or copy the original text</li>
            <li>Share the QR code with others for quick access</li>
          </ul>
        </div>
      </div>
    </>
  );
}