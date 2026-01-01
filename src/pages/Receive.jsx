import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Lock,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  Download,
  AlertCircle,
  FileText,
  Clock,
  Shield
} from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function ReceivePage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [decryptionKey, setDecryptionKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Handle individual digit input
  const handleDigitChange = (index, value) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setError(null);

    // Auto-focus next input
    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pastedData) {
      const newCode = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
      setCode(newCode);
      // Focus the next empty input or the last one
      const nextEmptyIndex = newCode.findIndex((d) => !d);
      const focusIndex = nextEmptyIndex === -1 ? 3 : nextEmptyIndex;
      inputRefs[focusIndex].current?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === "Enter" && code.every((d) => d)) {
      handleRetrieve();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRetrieve = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      setError("Please enter a complete 4-digit code");
      return;
    }

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
            code: fullCode,
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
      // Shake animation trigger
      inputRefs.forEach((ref) => {
        ref.current?.classList.add("animate-shake");
        setTimeout(() => ref.current?.classList.remove("animate-shake"), 500);
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCode(["", "", "", ""]);
    setDecryptionKey("");
    setContent(null);
    setError(null);
    inputRefs[0].current?.focus();
  };

  return (
    <>
      <Helmet>
        <title>Receive Clipboard | CloudClip</title>
        <meta
          name="description"
          content="Securely receive clipboard content with end-to-end encryption."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Receive Clipboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter the 4-digit code to access shared content
          </p>
        </div>

        {!content ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6 animate-slide-in">
              {/* Code Input Card */}
              <div className="glass rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">
                    Enter Access Code
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The 4-digit code shared with you
                  </p>
                </div>

                {/* Code Input Boxes */}
                <div className="flex justify-center gap-3 mb-6">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`code-input ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                        }`}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center justify-center gap-2 text-red-500 text-sm mb-6 animate-slide-in">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Password Input */}
                <div className="max-w-sm mx-auto mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password (if required)
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={decryptionKey}
                      onChange={(e) => setDecryptionKey(e.target.value)}
                      placeholder="Enter password if protected"
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
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleRetrieve}
                  disabled={!code.every((d) => d) || isLoading}
                  className="w-full max-w-sm mx-auto block py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 
                    text-white rounded-2xl font-semibold text-lg shadow-lg shadow-indigo-500/30
                    hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg
                    transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Retrieving...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Access Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tips Sidebar */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">
                  How It Works
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900/50 rounded-full 
                      flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      1
                    </span>
                    <span>Enter the 4-digit code shared with you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900/50 rounded-full 
                      flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      2
                    </span>
                    <span>If protected, enter the password too</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900/50 rounded-full 
                      flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      3
                    </span>
                    <span>View or copy the content instantly</span>
                  </li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-4">
                  Having Trouble?
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>Double-check the code for typos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>Codes expire after 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>Ask sender for the password if needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Content Display */
          <div className="max-w-2xl mx-auto animate-bounce-in">
            <div className="glass rounded-3xl p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                      Content Retrieved
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      {content.is_confidential && (
                        <span className="badge badge-warning">
                          <Lock className="h-3 w-3 mr-1" />
                          Protected
                        </span>
                      )}
                      {content.expires_at && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Expires: {new Date(content.expires_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(content.content)}
                  className={`p-3 rounded-xl transition-all duration-300 ${copied
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>

              {/* Content Box */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-6">
                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm overflow-x-auto">
                  {content.content}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => copyToClipboard(content.content)}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 
                    bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy All"}
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([content.content], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `clipboard-${code.join("")}.txt`;
                    a.click();
                  }}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 
                    bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium 
                    hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>

              {/* Receive Another */}
              <button
                onClick={resetForm}
                className="w-full mt-6 py-3 text-indigo-600 dark:text-indigo-400 font-medium 
                  hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
              >
                Receive Another Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
