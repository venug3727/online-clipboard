import React, { useState, useEffect } from "react";
import { Link, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";
import QRCode from "react-qr-code";

// AdSense Ad Component
const AdSenseAd = ({ slotId }) => {
  useEffect(() => {
    try {
      // Only push if adsbygoogle is loaded and this ad hasn't been pushed
      if (window.adsbygoogle && !window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="mb-8 text-center">
      <p className="text-sm text-gray-500 mb-2">Sponsored Content</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9460974170228372"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

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
    
    // Skip if on homepage or custom-url page
    if (path === '/' || path.startsWith('/custom-url')) return;

    const shortPath = path.substring(1); // Remove leading "/"
    
    // Call your backend API
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/urls/${shortPath}`, {
      redirect: 'manual' // Important for handling redirects
    })
    .then(response => {
      if (response.type === 'opaqueredirect') {
        // For CORS reasons, reconstruct the redirect URL
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/urls/${shortPath}`;
      } else if (response.ok) {
        return response.json().then(data => {
          window.location.href = data.original_url;
        });
      } else {
        console.error('Short URL not found');
      }
    })
    .catch(error => {
      console.error('Redirect failed:', error);
    });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Enhanced SEO Meta Tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>BMSClipboard - Create Custom Short URLs for BMSCE/BMSIT</title>
        <meta name="application-name" content="BMSClipboard" />
        <meta name="apple-mobile-web-app-title" content="BMSClipboard" />
        <meta
          name="description"
          content="Generate custom short URLs for BMSCE and BMSIT students with BMSClipboard's secure URL shortener."
        />
        <meta
          name="keywords"
          content="BMSClipboard, BMSCE, BMSIT, URL shortener, custom links, BMS College of Engineering, BMS Institute of Technology, secure links, QR code generator"
        />
        <meta name="author" content="BMS Development Team" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="BMSClipboard URL Shortener" />
        <meta itemProp="description" content="Secure URL shortener for BMSCE/BMSIT students and faculty" />
        <meta itemProp="image" content="https://bmsclipboard.netlify.app/logo.png" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://bmsclipboard.netlify.app/custom-url" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BMSClipboard URL Shortener" />
        <meta property="og:description" content="Create custom short URLs for BMSCE/BMSIT community" />
        <meta property="og:image" content="https://bmsclipboard.netlify.app/url-shortener-preview.png" />
        <meta property="og:site_name" content="BMSClipboard" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMSClipboard URL Shortener" />
        <meta name="twitter:description" content="Create custom short URLs for BMSCE/BMSIT community" />
        <meta name="twitter:image" content="https://bmsclipboard.netlify.app/url-shortener-preview.png" />
        <meta name="twitter:site" content="@BMSClipboard" />
        <meta name="twitter:creator" content="@BMSClipboard" />
        
        {/* Institution Specific Tags */}
        <meta name="institution" content="BMSCE, BMSIT" />
        <meta name="campus" content="Bangalore" />
        <meta name="organization" content="BMS Educational Trust" />
        
        {/* Google Ads Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372" crossorigin="anonymous"></script>
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Custom URL Shortener
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Create memorable short links under your domain
        </p>
      </div>

      {/* Educational content section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Why Use a Custom URL Shortener?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Enhanced Branding</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Custom short URLs with your BMSCE/BMSIT identity create a more professional appearance and increase trust.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Better Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create separate links for different channels to analyze which platforms generate the most engagement.
            </p>
          </div>
        </div>
      </div>

      {/* AdSense Ad Unit 1 - Before the form */}
      <AdSenseAd slotId="1101018584" />

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

      {/* Tips for effective URL usage */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Tips for Effective Short URLs
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2"></span>
            <span>Keep custom paths short but meaningful (ex: "bmsit-exam" or "bmsce-lab")</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2"></span>
            <span>Use consistent naming conventions for departmental links</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2"></span>
            <span>For printed materials, use easy-to-type paths (avoid similar-looking characters)</span>
          </li>
        </ul>
      </div>

      {shortUrl && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
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
                  level="H"
                  bgColor="transparent"
                  fgColor={document.documentElement.classList.contains('dark') ? '#000' : '#000'}
                  className="mx-auto"
                  id="qr-code-svg"
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

          {/* AdSense Ad Unit 2 - After results are shown */}
          <AdSenseAd slotId="7843256991" />
        </>
      )}

      {/* Additional educational content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Common URL Shortener Use Cases at BMSCE/BMSIT
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Event Promotion</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create memorable links for campus events, workshops, and seminars to share on posters and digital announcements.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Department Resources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Share course materials, lecture notes, and reference documents with clean, easy-to-remember links.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Club Activities</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Distribute registration forms and information for technical and cultural club activities across campus.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>All links are valid for 1 year</p>
        <p className="mt-1">© {new Date().getFullYear()} BMSClipboard</p>
      </div>
    </div>
  );
}