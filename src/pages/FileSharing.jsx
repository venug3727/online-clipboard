import React, { useState, useRef, useEffect } from "react";
import { Upload, File, Download, Copy, Trash2, Eye } from "lucide-react";
import { Helmet } from "react-helmet";

export default function FileSharing() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [shareLinks, setShareLinks] = useState([]);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [receivedFile, setReceivedFile] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  // Load ads when component mounts and when content is available
  useEffect(() => {
    if ((files.length > 0 || shareLinks.length > 0 || receivedFile) && !adLoaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [files, shareLinks, receivedFile, adLoaded]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");

    if (files.length === 0) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);

    try {
      const selectedFile = files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/files/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      const data = await response.json();

      setShareLinks([
        ...shareLinks,
        {
          id: data.share_code,
          name: data.file_name,
          size: (data.file_size / (1024 * 1024)).toFixed(2) + " MB",
          link: data.download_url,
          expires: new Date(data.expires_at).toLocaleDateString(),
          code: data.share_code,
          contentType: data.content_type,
        },
      ]);
      setFiles([]);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchFileByCode = async () => {
    if (!codeInput.match(/^\d{4}$/)) {
      setError("Please enter a valid 4-digit code");
      return;
    }

    setIsFetching(true);
    setError("");
    setReceivedFile(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/files/files/${codeInput}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "File not found");
      }

      const data = await response.json();
      setReceivedFile({
        name: data.file_name,
        size: (data.file_size / (1024 * 1024)).toFixed(2) + " MB",
        downloadUrl: data.download_url,
        expires: new Date(data.expires_at).toLocaleDateString(),
        contentType: data.content_type,
      });
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: Show a toast notification
  };

  const deleteLink = (id) => {
    setShareLinks(shareLinks.filter((link) => link.id !== id));
  };

  const renderFilePreview = () => {
    if (!receivedFile) return null;

    const isImage = receivedFile.contentType?.startsWith("image/");
    const isPDF = receivedFile.contentType === "application/pdf";
    const isText = receivedFile.contentType?.startsWith("text/");

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Received File
        </h2>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white flex items-center">
                <File className="h-5 w-5 mr-2" />
                {receivedFile.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {receivedFile.size}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Expires: {receivedFile.expires}
              </p>
            </div>
            
            <div className="flex gap-2">
              <a
                href={receivedFile.downloadUrl}
                download={receivedFile.name}
                className="flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
              <button
                onClick={() => copyToClipboard(receivedFile.downloadUrl)}
                className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </button>
            </div>
          </div>

          {isImage && (
            <div className="mt-4">
              <img
                src={receivedFile.downloadUrl}
                alt={receivedFile.name}
                className="max-w-full h-auto max-h-96 rounded border border-gray-200 dark:border-gray-700 mx-auto"
              />
            </div>
          )}

          {isPDF && (
            <div className="mt-4 h-96">
              <iframe
                src={receivedFile.downloadUrl}
                title={receivedFile.name}
                className="w-full h-full border border-gray-200 dark:border-gray-700 rounded"
              />
            </div>
          )}

          {isText && (
            <div className="mt-4 h-64">
              <iframe
                src={receivedFile.downloadUrl}
                title={receivedFile.name}
                className="w-full h-full border border-gray-200 dark:border-gray-700 rounded"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>BMSClipboard | Secure File Sharing for BMSCE/BMSIT</title>
        <meta name="application-name" content="BMSClipboard" />
        <meta name="apple-mobile-web-app-title" content="BMSClipboard" />
        <meta
          name="description"
          content="Securely share files with BMSCE and BMSIT students using BMSClipboard's encrypted file sharing platform."
        />
        <meta
          name="keywords"
          content="BMSClipboard, BMSCE, BMSIT, file sharing, secure file transfer, BMS College of Engineering, BMS Institute of Technology, encrypted file sharing, temporary file storage"
        />
        <meta name="author" content="BMS Development Team" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="BMSClipboard File Sharing" />
        <meta itemProp="description" content="Secure file sharing platform for BMSCE/BMSIT students and faculty" />
        <meta itemProp="image" content="https://bmsclipboard.netlify.app/file-sharing-preview.png" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://bmsclipboard.netlify.app/file-sharing" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BMSClipboard File Sharing" />
        <meta property="og:description" content="Secure file sharing for BMSCE/BMSIT community" />
        <meta property="og:image" content="https://bmsclipboard.netlify.app/file-sharing-preview.png" />
        <meta property="og:site_name" content="BMSClipboard" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMSClipboard File Sharing" />
        <meta name="twitter:description" content="Secure file sharing for BMSCE/BMSIT community" />
        <meta name="twitter:image" content="https://bmsclipboard.netlify.app/file-sharing-preview.png" />
        <meta name="twitter:site" content="@BMSClipboard" />
        <meta name="twitter:creator" content="@BMSClipboard" />
        
        {/* Institution Specific Tags */}
        <meta name="institution" content="BMSCE, BMSIT" />
        <meta name="campus" content="Bangalore" />
        <meta name="organization" content="BMS Educational Trust" />
        
        {/* Google Ads Script - Only loads when there's content */}
        {(files.length > 0 || shareLinks.length > 0 || receivedFile) && (
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372" crossOrigin="anonymous"></script>
        )}
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          File Sharing
        </h1>

        {/* Content for empty state to ensure AdSense compliance */}
        {!files.length && !shareLinks.length && !receivedFile && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About BMSClipboard File Sharing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Securely share files with BMSCE and BMSIT students and faculty. 
              Our platform provides encrypted temporary file storage with unique access codes.
            </p>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Features:</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
              <li>End-to-end encrypted file transfers</li>
              <li>Auto-expiring links (7 days)</li>
              <li>4-digit access codes for easy sharing</li>
              <li>Preview images, PDFs, and text files</li>
              <li>Built specifically for BMSCE/BMSIT community</li>
            </ul>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upload Files
          </h2>
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Choose File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="submit"
                  disabled={files.length === 0 || isUploading}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:bg-gray-400"
                >
                  {isUploading ? "Uploading..." : "Upload File"}
                </button>
              </div>

              {files.length > 0 && (
                <div className="mt-3">
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <File className="h-4 w-4 mr-2" />
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Access Shared File
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setCodeInput(val);
                setError("");
              }}
              placeholder="Enter 4-digit code"
              maxLength="4"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex-1"
            />
            <button
              onClick={fetchFileByCode}
              disabled={isFetching || codeInput.length !== 4}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:bg-gray-400"
            >
              {isFetching ? "Loading..." : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  View
                </>
              )}
            </button>
          </div>
        </div>

        {/* AdSense Ad Unit - Only shows when there's content */}
        {(files.length > 0 || shareLinks.length > 0 || receivedFile) && (
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

        {renderFilePreview()}

        {shareLinks.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Shared Files
            </h2>
            <div className="space-y-4">
              {shareLinks.map((link) => (
                <div
                  key={link.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white flex items-center">
                        <File className="h-5 w-5 mr-2" />
                        {link.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {link.size} • Code: {link.code}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={link.link}
                      readOnly
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => copyToClipboard(link.link)}
                      className="p-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      aria-label="Copy link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Expires: {link.expires}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}