import React, { useState, useRef } from "react";
import {
  Send,
  Lock,
  Copy,
  QrCode,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  Share2,
  MessageCircle
} from "lucide-react";
import QRCode from "react-qr-code";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function SendPage() {
  const [content, setContent] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const fileInputRef = useRef(null);

  const maxChars = 50000;
  const charCount = content.length;
  const charPercentage = (charCount / maxChars) * 100;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const message = `Here's your clipboard code: ${generatedCode}\nAccess it at: ${window.location.origin}/receive`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
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

  const resetForm = () => {
    setContent("");
    setIsConfidential(false);
    setEncryptionKey("");
    setGeneratedCode(null);
  };

  return (
    <>
      <Helmet>
        <title>Send Clipboard | CloudClip</title>
        <meta
          name="description"
          content="Securely send clipboard content with end-to-end encryption."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Send Clipboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share text or code securely with a unique code
          </p>
        </div>

        {!generatedCode ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6 animate-slide-in">
              {/* Textarea Card */}
              <div className="glass rounded-2xl p-6">
                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
                    placeholder="Paste your text, code, or notes here..."
                    className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 
                      rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                      focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300
                      resize-none font-mono text-sm"
                  />
                  {/* Character Counter */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${charPercentage > 90 ? "bg-red-500" : charPercentage > 70 ? "bg-amber-500" : "bg-indigo-500"
                          }`}
                        style={{ width: `${Math.min(charPercentage, 100)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${charPercentage > 90 ? "text-red-500" : "text-gray-400"
                      }`}>
                      {charCount.toLocaleString()} / {maxChars.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Options */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-500" />
                  Security Options
                </h3>

                {/* Password Toggle */}
                <label className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl cursor-pointer group">
                  <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isConfidential ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isConfidential ? "translate-x-7" : "translate-x-1"
                      }`} />
                    <input
                      type="checkbox"
                      checked={isConfidential}
                      onChange={(e) => setIsConfidential(e.target.checked)}
                      className="sr-only"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password Protection
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Recipient will need a password to access
                    </span>
                  </div>
                </label>

                {/* Password Input */}
                {isConfidential && (
                  <div className="mt-4 animate-slide-in">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={encryptionKey}
                        onChange={(e) => setEncryptionKey(e.target.value)}
                        placeholder="Enter a strong password"
                        className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 
                          rounded-xl text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                          transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 
                          dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Share this password through a different channel for security
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSend}
                disabled={!content || (isConfidential && !encryptionKey) || isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 
                  text-white rounded-2xl font-semibold text-lg shadow-lg shadow-indigo-500/30
                  hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg
                  transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate Secure Link</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {/* Tips Sidebar */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-gray-900 dark:text-white">
                    Quick Tips
                  </h3>
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="text-sm text-indigo-500 hover:text-indigo-600"
                  >
                    {showTips ? "Hide" : "Show"}
                  </button>
                </div>
                {showTips && (
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-3">
                      <Shield className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Files are encrypted during transfer and storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                      <span>Links automatically expire after 24 hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Lock className="h-4 w-4 mt-0.5 text-indigo-500 flex-shrink-0" />
                      <span>Optional password protection available</span>
                    </li>
                  </ul>
                )}
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">
                  Pro Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    <span>Share passwords through a different channel (e.g., messaging app)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    <span>Large files? Use our File Sharing feature instead</span>
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
                shadow-lg shadow-green-500/30 animate-bounce-in">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Your Secure Link is Ready!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Share this code with anyone to give them access
              </p>

              {/* Code Display */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your Access Code</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                    {generatedCode}
                  </span>
                  <button
                    onClick={() => copyToClipboard(generatedCode)}
                    className={`p-2 rounded-xl transition-all duration-300 ${copied
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                  >
                    {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-6">
                <QRCode value={generatedCode} size={160} level="H" />
              </div>

              {/* Share Options */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <button
                  onClick={shareViaWhatsApp}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl 
                    font-medium hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
                <button
                  onClick={() => copyToClipboard(`${window.location.origin}/receive?code=${generatedCode}`)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 
                    text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Copy Link
                </button>
              </div>

              {/* Expiry Notice */}
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                This link expires in 24 hours
              </p>

              {/* New Clipboard Button */}
              <button
                onClick={resetForm}
                className="mt-6 px-6 py-3 text-indigo-600 dark:text-indigo-400 font-medium 
                  hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
              >
                Send Another Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
