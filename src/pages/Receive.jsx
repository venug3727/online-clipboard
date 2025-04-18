import React, { useState, useEffect } from "react";
import { Search, Lock, Copy, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Receive() {
  const [code, setCode] = useState("");
  const [decryptionKey, setDecryptionKey] = useState("");
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  // Load ads when content is retrieved
  useEffect(() => {
    if (content && !adLoaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [content, adLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRetrieve();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRetrieve = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/clipboard/receive`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            decryption_key: decryptionKey,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to retrieve clipboard");
      }

      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>BMSClipboard | Secure Clipboard Receiver for BMSCE/BMSIT</title>
        <meta name="application-name" content="BMSClipboard" />
        <meta name="apple-mobile-web-app-title" content="BMSClipboard" />
        <meta
          name="description"
          content="Securely receive clipboard content with end-to-end encryption for BMSCE and BMSIT students."
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
        <meta itemProp="name" content="BMSClipboard Receiver" />
        <meta itemProp="description" content="Secure clipboard receiver for BMSCE/BMSIT students and faculty" />
        <meta itemProp="image" content="https://bmsclipboard.netlify.app/receive-preview.png" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://bmsclipboard.netlify.app/receive" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BMSClipboard Receiver" />
        <meta property="og:description" content="Securely receive clipboard content for BMSCE/BMSIT community" />
        <meta property="og:image" content="https://bmsclipboard.netlify.app/receive-preview.png" />
        <meta property="og:site_name" content="BMSClipboard" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMSClipboard Receiver" />
        <meta name="twitter:description" content="Securely receive clipboard content for BMSCE/BMSIT community" />
        <meta name="twitter:image" content="https://bmsclipboard.netlify.app/receive-preview.png" />
        <meta name="twitter:site" content="@BMSClipboard" />
        <meta name="twitter:creator" content="@BMSClipboard" />
        
        {/* Institution Specific Tags */}
        <meta name="institution" content="BMSCE, BMSIT" />
        <meta name="campus" content="Bangalore" />
        <meta name="organization" content="BMS Educational Trust" />
        
        {/* Google Ads Script - Only loads when content is retrieved */}
        {content && (
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372" crossOrigin="anonymous"></script>
        )}
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Receive Clipboard
        </h1>

        {/* Content for empty state to ensure AdSense compliance */}
        {!content && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              How to receive content
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Enter the 4-digit code provided by the sender</li>
              <li>If the content is encrypted, enter the decryption key</li>
              <li>Click "Retrieve Clipboard" to access the shared content</li>
              <li>All content is automatically deleted after being viewed</li>
              <li>For BMSCE/BMSIT students and faculty only</li>
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter 4-digit Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={4}
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="Enter code"
                  className="w-full px-4 py-2 pl-10 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Decryption Key (if required)
                </div>
              </label>
              <input
                type="password"
                value={decryptionKey}
                onChange={(e) => setDecryptionKey(e.target.value)}
                placeholder="Enter decryption key"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={!code || isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-xl font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Retrieve Clipboard"
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* AdSense Ad Unit - Only shows when content is retrieved */}
        {content && (
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

        {content && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Retrieved Content
              </h3>
              <div className="flex items-center space-x-2">
                {content.is_confidential && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                    Confidential
                  </span>
                )}
                <button
                  onClick={() => copyToClipboard(content.content)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 relative"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-mono text-sm">
                {content.content}
              </pre>
              {content.created_at && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Created: {new Date(content.created_at).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}