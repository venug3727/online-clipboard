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
  FileImage,
  FileText,
  FileVideo,
  FileAudio,
  FileArchive,
  Search,
  AlertCircle,
  Cloud,
} from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion, AnimatePresence } from "framer-motion";

export default function FileSharing() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shareLinks, setShareLinks] = useState([]);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [codeInput, setCodeInput] = useState(["", "", "", ""]);
  const [receivedFile, setReceivedFile] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copied, setCopied] = useState(null);
  const codeInputRefs = [useRef(), useRef(), useRef(), useRef()];

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

  const getFileIcon = (contentType) => {
    if (contentType?.startsWith("image/")) return FileImage;
    if (contentType?.startsWith("video/")) return FileVideo;
    if (contentType?.startsWith("audio/")) return FileAudio;
    if (contentType?.includes("zip") || contentType?.includes("rar") || contentType?.includes("archive")) return FileArchive;
    return FileText;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFilesSelected(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFilesSelected(selectedFiles);
  };

  const handleFilesSelected = (selectedFiles) => {
    if (selectedFiles.some((file) => file.size > 100 * 1024 * 1024)) {
      setError("File size exceeds 100MB limit");
      return;
    }
    setFiles(selectedFiles);
    setError("");
  };

  const handleUpload = async (e) => {
    e?.preventDefault();
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
        `"${data.file_name}" uploaded successfully! Code: ${data.share_code}`
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

  // Handle code input
  const handleCodeDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...codeInput];
    newCode[index] = digit;
    setCodeInput(newCode);
    setError("");

    if (digit && index < 3) {
      codeInputRefs[index + 1].current?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !codeInput[index] && index > 0) {
      codeInputRefs[index - 1].current?.focus();
    }
    if (e.key === "Enter" && codeInput.every((d) => d)) {
      fetchFileByCode();
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pastedData) {
      const newCode = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
      setCodeInput(newCode);
    }
  };

  const fetchFileByCode = async () => {
    const fullCode = codeInput.join("");
    if (fullCode.length !== 4) {
      setError("Please enter a valid 4-digit code");
      return;
    }

    setIsFetching(true);
    setError("");
    setReceivedFile(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/files/files/${fullCode}`
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

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    addNotification("Copied to clipboard!");
  };

  const deleteLink = (id) => {
    const linkToDelete = shareLinks.find((link) => link.id === id);
    if (linkToDelete) {
      addNotification(`Removed "${linkToDelete.name}"`);
    }
    setShareLinks(shareLinks.filter((link) => link.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>File Sharing | CloudClip</title>
        <meta
          name="description"
          content="Share files up to 100MB with secure, encrypted links."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto relative">
        {/* Notifications */}
        <div className="fixed top-20 right-4 z-50 w-80 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-xl shadow-lg flex items-start gap-3 ${notification.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
                  }`}
              >
                {notification.type === "error" ? (
                  <XCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <span className="flex-1 text-sm">{notification.message}</span>
                <button
                  onClick={() =>
                    setNotifications(
                      notifications.filter((n) => n.id !== notification.id)
                    )
                  }
                  className="hover:opacity-80"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            File Sharing
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and share files up to 100MB securely
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="space-y-6 animate-slide-in">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Cloud className="h-5 w-5 text-indigo-500" />
                Upload File
              </h2>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`drop-zone cursor-pointer ${isDragOver ? "drag-over" : ""}`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all duration-300 ${isDragOver
                    ? "bg-indigo-100 dark:bg-indigo-900/50"
                    : "bg-gray-100 dark:bg-gray-800"
                    }`}>
                    <Upload className={`h-8 w-8 ${isDragOver ? "text-indigo-500" : "text-gray-400"
                      }`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {isDragOver ? "Drop your file here" : "Drag & drop or click to upload"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Maximum file size: 100MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected File */}
              {files.length > 0 && !isUploading && (
                <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center gap-3 animate-slide-in">
                  <File className="h-8 w-8 text-indigo-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {files[0].name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles([]);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-4 animate-slide-in">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Uploading: {files[0]?.name}
                    </span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 
                  text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30
                  hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                  transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload File</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Access Section */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-indigo-500" />
                Access Shared File
              </h2>

              {/* Code Input */}
              <div className="flex justify-center gap-3 mb-4">
                {codeInput.map((digit, index) => (
                  <input
                    key={index}
                    ref={codeInputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    onPaste={handleCodePaste}
                    className="code-input"
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center justify-center gap-2 text-red-500 text-sm mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={fetchFileByCode}
                disabled={isFetching || codeInput.some((d) => !d)}
                className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 
                  text-gray-900 dark:text-white rounded-xl font-semibold
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isFetching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-5 w-5" />
                    <span>View File</span>
                  </>
                )}
              </button>
            </div>

            {/* Received File Preview */}
            {receivedFile && (
              <div className="glass rounded-2xl p-6 animate-bounce-in">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                    {React.createElement(getFileIcon(receivedFile.contentType), {
                      className: "h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {receivedFile.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {receivedFile.size} • Expires: {receivedFile.expires}
                    </p>
                  </div>
                </div>

                {/* Preview for images */}
                {receivedFile.contentType?.startsWith("image/") && (
                  <div className="mt-4">
                    <img
                      src={receivedFile.downloadUrl}
                      alt={receivedFile.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <a
                    href={receivedFile.downloadUrl}
                    download={receivedFile.name}
                    className="flex-1 py-3 px-4 bg-indigo-500 text-white rounded-xl font-medium
                      hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  <button
                    onClick={() => copyToClipboard(receivedFile.downloadUrl, "received")}
                    className={`px-4 rounded-xl transition-colors flex items-center justify-center ${copied === "received"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    {copied === "received" ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shared Files List */}
        {shareLinks.length > 0 && (
          <div className="mt-8 glass rounded-2xl p-6 animate-slide-in">
            <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4">
              Your Shared Files
            </h2>
            <div className="space-y-3">
              {shareLinks.map((link) => {
                const FileIcon = getFileIcon(link.contentType);
                return (
                  <div
                    key={link.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center gap-4"
                  >
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                      <FileIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {link.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {link.size} • Code: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{link.code}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(link.code, link.id)}
                        className={`p-2 rounded-lg transition-colors ${copied === link.id
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                      >
                        {copied === link.id ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => deleteLink(link.id)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 
                          hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
