import React, { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  Copy,
  CheckCircle,
  ExternalLink,
  Download,
  Globe,
  Zap,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";
import QRCode from "react-qr-code";

export default function CustomUrl() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateShortUrl = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!originalUrl) {
      setError("Please enter a URL");
      setIsLoading(false);
      return;
    }

    try {
      // Validate URL format
      try {
        new URL(originalUrl);
      } catch {
        throw new Error(
          "Please enter a valid URL (include http:// or https://)"
        );
      }

      // Validate custom path if provided
      if (customPath) {
        if (!/^[a-zA-Z0-9]+$/.test(customPath)) {
          throw new Error("Custom path can only contain letters and numbers");
        }
        if (customPath.length < 3) {
          throw new Error("Custom path must be at least 3 characters");
        }
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/urls/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: originalUrl,
            custom_path: customPath || undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "URL shortening failed");
      }

      const data = await response.json();
      setShortUrl(data.short_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const path = window.location.pathname;

    // Skip if on homepage or custom-url page
    if (path === "/" || path.startsWith("/custom-url")) return;

    const shortPath = path.substring(1); // Remove leading "/"

    // Call your backend API
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/urls/${shortPath}`, {
      redirect: "manual", // Important for handling redirects
    })
      .then((response) => {
        if (response.type === "opaqueredirect") {
          window.location.href = `${import.meta.env.VITE_API_BASE_URL
            }/api/urls/${shortPath}`;
        } else if (response.ok) {
          return response.json().then((data) => {
            window.location.href = data.original_url;
          });
        } else {
          console.error("Short URL not found");
        }
      })
      .catch((error) => {
        console.error("Redirect failed:", error);
      });
  }, []);

  const copyToClipboard = () => {
    const fullUrl = `https://clip.vgcs.online/${shortUrl.split("/").pop()}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
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
      downloadLink.download = `QR_${customPath || "shorturl"}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(svgData))
    )}`;
  };

  const resetForm = () => {
    setOriginalUrl("");
    setCustomPath("");
    setShortUrl("");
    setError("");
  };

  const fullShortUrl = shortUrl ? `https://clip.vgcs.online/${shortUrl.split("/").pop()}` : "";

  return (
    <>
      <Helmet>
        <title>URL Shortener | CloudClip</title>
        <meta
          name="description"
          content="Create memorable short links and track clicks. Free custom URL shortener."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
            URL Shortener
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create short, memorable links for any URL
          </p>
        </div>

        {!shortUrl ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 animate-slide-in">
              <div className="glass rounded-2xl p-8">
                <form onSubmit={generateShortUrl} className="space-y-6">
                  {/* Original URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Original URL
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder="https://example.com/very-long-url"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 
                          rounded-xl text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                          transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Custom Path */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Path (optional)
                    </label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 
                      focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all duration-300">
                      <span className="flex items-center px-4 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium">
                        clip.vgcs.online/
                      </span>
                      <input
                        type="text"
                        value={customPath}
                        onChange={(e) =>
                          setCustomPath(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
                        }
                        placeholder="mylink"
                        className="flex-1 px-4 py-4 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white 
                          focus:outline-none"
                        pattern="[a-zA-Z0-9]+"
                        title="Only letters and numbers allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Minimum 3 characters. Leave blank for a random path.
                    </p>
                  </div>

                  {/* Live Preview */}
                  {(originalUrl || customPath) && (
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl animate-slide-in">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Preview:</p>
                      <p className="font-mono text-indigo-600 dark:text-indigo-400 break-all">
                        clip.vgcs.online/{customPath || "abc123"}
                      </p>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-slide-in">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 
                      text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/30
                      hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-5 w-5" />
                        <span>Create Short URL</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Features Sidebar */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">
                  Why Shorten URLs?
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                      <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Easy to Share</p>
                      <p>Short links are easier to remember and share</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                      <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Professional</p>
                      <p>Clean links look better in emails and presentations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/50 rounded-lg">
                      <BarChart3 className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">QR Support</p>
                      <p>Automatically generates a QR code for your link</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="max-w-xl mx-auto animate-bounce-in">
            <div className="glass rounded-3xl p-8 text-center">
              {/* Success Icon */}
              <div className="inline-flex p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 
                shadow-lg shadow-green-500/30">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Your Short URL is Ready!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your link has been created successfully
              </p>

              {/* URL Display */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <ExternalLink className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                    <a
                      href={fullShortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline truncate"
                    >
                      {fullShortUrl}
                    </a>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className={`p-2 rounded-xl transition-all duration-300 flex-shrink-0 ${copied
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                  >
                    {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Scan to access</p>
                <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                  <QRCode
                    value={fullShortUrl}
                    size={180}
                    level="H"
                    bgColor="transparent"
                    id="qr-code-svg"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={downloadQR}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl 
                    font-medium hover:bg-indigo-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download QR
                </button>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 
                    text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>

              {/* Create Another */}
              <button
                onClick={resetForm}
                className="mt-6 px-6 py-3 text-indigo-600 dark:text-indigo-400 font-medium 
                  hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
              >
                Create Another Short URL
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
