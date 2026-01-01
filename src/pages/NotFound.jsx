import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Home,
  Send,
  FileText,
  ArrowLeft,
  Search
} from "lucide-react";

export default function NotFound() {
  const suggestions = [
    { to: "/", icon: Home, label: "Home", desc: "Back to homepage" },
    { to: "/send", icon: Send, label: "Send", desc: "Share content" },
    { to: "/file-sharing", icon: FileText, label: "Files", desc: "Upload files" },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md animate-bounce-in">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-display font-bold text-gray-100 dark:text-gray-800 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl shadow-2xl shadow-indigo-500/30 animate-float">
              <AlertCircle className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or the clipboard content has expired.
        </p>

        {/* Main CTA */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 
            hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Go Back Home
        </Link>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Or try one of these:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center gap-2 px-4 py-2 glass rounded-xl 
                  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <item.icon className="h-4 w-4 text-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Code Input Suggestion */}
        <div className="mt-12 p-6 glass rounded-2xl">
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
            <Search className="h-4 w-4" />
            <span className="text-sm">Have a code?</span>
          </div>
          <Link
            to="/receive"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Enter it on the Receive page
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
