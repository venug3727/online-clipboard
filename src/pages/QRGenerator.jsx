import React, { useState, useRef } from "react";
import {
  QrCode,
  Download,
  Copy,
  CheckCircle,
  Link as LinkIcon,
  User,
  Wifi,
  CreditCard,
  Calendar,
  Palette
} from "lucide-react";
import QRCode from "react-qr-code";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function QRGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [qrColor, setQrColor] = useState("#6366f1");
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const presets = [
    { icon: LinkIcon, label: "URL", placeholder: "https://example.com" },
    { icon: User, label: "Contact", placeholder: "John Doe - john@email.com" },
    { icon: Wifi, label: "WiFi", placeholder: "Network:Password123" },
    { icon: CreditCard, label: "Payment", placeholder: "upi://pay?pa=..." },
    { icon: Calendar, label: "Event", placeholder: "Meeting - Dec 31, 2024" },
  ];

  const colors = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Green", value: "#10b981" },
    { name: "Orange", value: "#f97316" },
    { name: "Black", value: "#000000" },
  ];

  const generateQR = (e) => {
    e?.preventDefault();
    if (inputText.trim()) {
      setQrValue(inputText);
    }
  };

  const downloadQR = (format = "png") => {
    if (qrRef.current) {
      const svg = qrRef.current.querySelector("svg");
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = 512;
        canvas.height = 512;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 512, 512);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `cloudclip-qr.${format}`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };

      img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator | CloudClip</title>
        <meta
          name="description"
          content="Create custom QR codes for URLs, contact info, WiFi credentials, and more."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create custom QR codes for any content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6 animate-slide-in">
            {/* Main Input */}
            <div className="glass rounded-2xl p-6">
              <form onSubmit={generateQR} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter text or URL
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter any text, URL, or data..."
                    className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 
                      rounded-xl text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                      transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 
                    text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30
                    hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5
                    transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <QrCode className="h-5 w-5" />
                  Generate QR Code
                </button>
              </form>
            </div>

            {/* Quick Presets */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">
                Quick Presets
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setInputText(preset.placeholder)}
                    className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-left group
                      hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    <preset.icon className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{preset.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-indigo-500" />
                QR Code Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setQrColor(color.value)}
                    className={`w-10 h-10 rounded-xl transition-all duration-200 ${qrColor === color.value
                      ? "ring-2 ring-offset-2 ring-indigo-500 scale-110"
                      : "hover:scale-105"
                      }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="animate-slide-in-right">
            <div className="glass rounded-2xl p-8 text-center sticky top-24">
              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-6">
                Preview
              </h3>

              {/* QR Code Display */}
              <div
                ref={qrRef}
                className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6"
              >
                {qrValue ? (
                  <QRCode
                    value={qrValue}
                    size={200}
                    level="H"
                    fgColor={qrColor}
                    bgColor="#ffffff"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 dark:bg-gray-200 rounded-xl">
                    <div className="text-center text-gray-400">
                      <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Enter text to generate</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Display */}
              {qrValue && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 animate-slide-in">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Encoded content:</p>
                  <p className="text-gray-900 dark:text-white font-medium break-all line-clamp-2">
                    {qrValue}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => downloadQR("png")}
                  disabled={!qrValue}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl 
                    font-medium hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </button>
                <button
                  onClick={copyToClipboard}
                  disabled={!qrValue}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed ${copied
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy Text"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-12 glass rounded-2xl p-8 animate-slide-in">
          <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Popular Use Cases
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: LinkIcon, title: "Websites", desc: "Link to any webpage" },
              { icon: User, title: "Business Cards", desc: "Share contact info" },
              { icon: Wifi, title: "WiFi Access", desc: "Guest network codes" },
              { icon: Calendar, title: "Events", desc: "Event details & links" },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center"
              >
                <div className="inline-flex p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl mb-3">
                  <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
