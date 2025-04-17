import React, { useState, useEffect } from "react";
import { Link, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";
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
        throw new Error("Please enter a valid URL (include http:// or https://)");
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
  if (path.length > 1 && !path.startsWith("/custom-url")) {
    const shortPath = path.substring(1);
    
    // First check if we're on the root path (not in the custom-url page)
    if (!window.location.pathname.startsWith('/custom-url')) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/urls/${shortPath}`, {
        redirect: 'manual' // Important: handle redirect manually
      })
      .then(response => {
        if (response.type === 'opaqueredirect') {
          // For CORS reasons, we can't see the redirected URL
          // So we need to reconstruct it from our known URL structure
          window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/urls/${shortPath}`;
        } else if (response.ok) {
          return response.json();
        } else {
          // If not found, stay on the page
          console.error('Short URL not found');
        }
      })
      .catch(error => {
        console.error('Redirect error:', error);
      });
    }
  }
}, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>ClipVault - Create Custom Short URLs</title>
        <meta
          name="description"
          content="Generate custom short URLs for your links with ClipVault's URL shortener."
        />
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Custom URL Shortener
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Create memorable short links under your domain
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <form onSubmit={generateShortUrl}>
          <div className="mb-6">
            <label
              htmlFor="original-url"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Original URL
            </label>
            <input
              id="original-url"
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="custom-path"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Custom Path (optional)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                www.bmsclipboard.netlify.app/
              </span>
              <input
                id="custom-path"
                type="text"
                value={customPath}
                onChange={(e) =>
                  setCustomPath(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
                }
                placeholder="ex"
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-r-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                pattern="[a-zA-Z0-9]+"
                title="Only letters and numbers allowed"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Minimum 3 characters. Leave blank for a random path.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-200"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Link className="h-5 w-5 mr-2" />
                Create Short URL
              </>
            )}
          </button>
        </form>
      </div>

      {shortUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Short URL
          </h2>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-6">
            <div className="flex items-center overflow-hidden">
              <ExternalLink className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 flex-shrink-0" />
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline truncate"
              >
                {shortUrl}
              </a>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              aria-label="Copy URL to clipboard"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              QR Code
            </h3>
            <div className="p-4 bg-white dark:bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg inline-block">
              <QRCode
                value={shortUrl}
                size={160}
                level="H"  // High error correction
                bgColor="transparent"
                fgColor={document.documentElement.classList.contains('dark') ? '#000' : '#000'}
                className="mx-auto"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
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
                    downloadLink.download = `clipvault-qr-${customPath || "link"}.png`;
                    downloadLink.href = pngFile;
                    downloadLink.click();
                  };
                  
                  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
                }}
                className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Download QR Code
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              Scan this QR code to access your link
            </p>
          </div>
        </div>
      )}

      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>All links are valid for 1 year</p>
        <p className="mt-1">© {new Date().getFullYear()} ClipVault</p>
      </div>
    </div>
  );
}