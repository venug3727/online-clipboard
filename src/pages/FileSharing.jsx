import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  File,
  Download,
  Copy,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";

export default function FileSharing() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shareLinks, setShareLinks] = useState([]);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [receivedFile, setReceivedFile] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(notifications.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.some((file) => file.size > 100 * 1024 * 1024)) {
      setError("File size exceeds 100MB limit");
      return;
    }
    setFiles(selectedFiles);
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setUploadProgress(0);

    if (files.length === 0) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);

    try {
      const selectedFile = files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      });

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(
                new Error(
                  xhr.responseText
                    ? JSON.parse(xhr.responseText).detail
                    : "Upload failed"
                )
              );
            }
          }
        };

        xhr.open(
          "POST",
          `${import.meta.env.VITE_API_BASE_URL}/api/files/upload`
        );
        xhr.send(formData);
      });

      const data = await uploadPromise;

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
      addNotification(
        `"${data.file_name}" uploaded successfully! Share code: ${data.share_code}`
      );
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
      addNotification(`Upload failed: ${err.message}`, "error");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
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
      addNotification(`File "${data.file_name}" loaded successfully!`);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      addNotification(`Error: ${err.message}`, "error");
    } finally {
      setIsFetching(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addNotification("Copied to clipboard!");
  };

  const deleteLink = (id) => {
    const linkToDelete = shareLinks.find((link) => link.id === id);
    if (linkToDelete) {
      addNotification(`Removed shared file "${linkToDelete.name}"`);
    }
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
        <title>BMSClipboard | Secure File Sharing for BMSCE/BMSIT</title>
        <meta
          name="description"
          content="Securely share files with BMSCE and BMSIT students using BMSClipboard's encrypted file sharing platform."
        />
        <meta
          name="keywords"
          content="BMSClipboard, BMSCE, BMSIT, file sharing, secure file transfer"
        />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8 relative">
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 w-80 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-lg shadow-lg flex items-start ${
                  notification.type === "error"
                    ? "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                    : "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
                }`}
              >
                {notification.type === "error" ? (
                  <XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <span className="flex-1">{notification.message}</span>
                <button
                  onClick={() =>
                    setNotifications(
                      notifications.filter((n) => n.id !== notification.id)
                    )
                  }
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          File Sharing
        </h1>

        {/* Empty state with educational content */}
        {!files.length && !shareLinks.length && !receivedFile && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About BMSClipboard File Sharing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Securely share files with BMSCE and BMSIT students and faculty.
              Our platform provides encrypted temporary file storage with unique
              access codes.
            </p>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Features:
            </h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
              <li>End-to-end encrypted file transfers</li>
              <li>Auto-expiring links (7 days)</li>
              <li>4-digit access codes for easy sharing</li>
              <li>Preview images, PDFs, and text files</li>
              <li>Built specifically for BMSCE/BMSIT community</li>
              <li>100MB maximum file size</li>
            </ul>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 flex items-center">
            <XCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {/* Upload Section */}
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
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload File"
                  )}
                </button>
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>Uploading: {files[0]?.name}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {files.length > 0 && !isUploading && (
                <div className="mt-3">
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <File className="h-4 w-4 mr-2" />
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Access Shared File Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Access Shared File
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 4);
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
              {isFetching ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  View
                </>
              )}
            </button>
          </div>
        </div>

        {/* AdSense Ad - Only shows when content exists */}
        {/* {(shareLinks.length > 0 || receivedFile) && (
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
        )} */}

        {(shareLinks.length > 0 || receivedFile) && (
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

        {/* Received File Preview */}
        {renderFilePreview()}

        {/* Shared Files List */}
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
