import React, { useState, useRef, useEffect } from "react";
import { Upload, Lock, Copy, QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet";

export default function Send() {
  const [content, setContent] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const fileInputRef = useRef(null);

  // Load ads when code is generated
  useEffect(() => {
    if (generatedCode && !adLoaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [generatedCode, adLoaded]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target?.result);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/clipboard/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
            is_confidential: isConfidential,
            encryption_key: encryptionKey,
            content_type: "text",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send clipboard");
      }

      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to send clipboard content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>BMSClipboard | Secure Clipboard Sender for BMSCE/BMSIT</title>
        <meta name="application-name" content="BMSClipboard" />
        <meta name="apple-mobile-web-app-title" content="BMSClipboard" />
        <meta
          name="description"
          content="Securely send clipboard content with end-to-end encryption for BMSCE and BMSIT students."
        />
        <meta
          name="keywords"
          content="BMSClipboard, BMSCE, BMSIT, secure clipboard, encrypted sharing, BMS College of Engineering, BMS Institute of Technology, confidential data transfer"
        />
        <meta name="author" content="BMS Development Team" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="BMSClipboard Sender" />
        <meta
          itemProp="description"
          content="Secure clipboard sender for BMSCE/BMSIT students and faculty"
        />
        <meta
          itemProp="image"
          content="https://bmsclipboard.netlify.app/send-preview.png"
        />

        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content="https://bmsclipboard.netlify.app/send"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BMSClipboard Sender" />
        <meta
          property="og:description"
          content="Securely send clipboard content for BMSCE/BMSIT community"
        />
        <meta
          property="og:image"
          content="https://bmsclipboard.netlify.app/send-preview.png"
        />
        <meta property="og:site_name" content="BMSClipboard" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMSClipboard Sender" />
        <meta
          name="twitter:description"
          content="Securely send clipboard content for BMSCE/BMSIT community"
        />
        <meta
          name="twitter:image"
          content="https://bmsclipboard.netlify.app/send-preview.png"
        />
        <meta name="twitter:site" content="@BMSClipboard" />
        <meta name="twitter:creator" content="@BMSClipboard" />

        {/* Institution Specific Tags */}
        <meta name="institution" content="BMSCE, BMSIT" />
        <meta name="campus" content="Bangalore" />
        <meta name="organization" content="BMS Educational Trust" />

        {/* Google Ads Script - Only loads when code is generated */}
        {generatedCode && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372"
            crossOrigin="anonymous"
          ></script>
        )}
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Send Clipboard
        </h1>

        {/* Content for empty state to ensure AdSense compliance */}
        {!generatedCode && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              How to send content securely
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Paste your text content or upload a file</li>
              <li>Mark as confidential for sensitive information</li>
              <li>Set an encryption key for confidential content</li>
              <li>Generate a unique 4-digit code to share</li>
              <li>Content will be available for 15 minutes</li>
              <li>For BMSCE/BMSIT students and faculty only</li>
            </ul>
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content here..."
              className="w-full h-40 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="text/*,image/*"
              />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <label className="flex items-center space-x-3 mb-6">
              <input
                type="checkbox"
                checked={isConfidential}
                onChange={(e) => setIsConfidential(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700 dark:text-gray-300 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                This is confidential
              </span>
            </label>

            {isConfidential && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Encryption Key
                </label>
                <input
                  type="password"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                  placeholder="Enter a secure key"
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={
                !content || (isConfidential && !encryptionKey) || isLoading
              }
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-xl font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <QrCode className="h-5 w-5 mr-2" />
                  Generate 4-digit Code and Send
                </>
              )}
            </button>
          </div>
          {/* AdSense Ad Unit - Only shows when code is generated */}
          {/* // Only show ads when code is generated */}
          {generatedCode && (
            <div className="my-8">
              <p className="text-xs text-gray-500 text-center mb-1">
                Advertisement
              </p>
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9460974170228372"
                data-ad-slot="1101018584"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          )}
          {generatedCode && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Your 4-digit Code
                </h3>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-4xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {generatedCode}
                  </span>
                  <button
                    onClick={() => copyToClipboard(generatedCode)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <QRCode value={generatedCode} size={180} />
              </div>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Share this code with the recipient. The content will be
                available for the next 15 minutes.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
