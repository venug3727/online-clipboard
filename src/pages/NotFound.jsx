import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Clipboard not found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The clipboard content you're looking for might have expired or doesn't
          exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
