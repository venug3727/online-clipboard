import React, { useState, useRef } from "react";
import { Upload, Lock, Copy, QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import { supabase } from "../lib/supabase";

export default function Send() {
  const [content, setContent] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const generateCode = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code);
      setIsLoading(false);
    }, 1000);
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
      alert(`text send the code is `, data.code);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to send clipboard content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-[-1000px] mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Send Clipboard
      </h1>

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
              Share this code with the recipient. The content will be available
              for the next 15 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
