import React, { useState } from "react";
import {
  Moon,
  Sun,
  Clock,
  Shield,
  Info,
  Github,
  Heart,
  ExternalLink,
  Trash2,
  Download,
  Upload
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [autoClearMinutes, setAutoClearMinutes] = useState(15);
  const [defaultEncryption, setDefaultEncryption] = useState(false);

  const clearLocalData = () => {
    if (confirm("Are you sure you want to clear all local data? This cannot be undone.")) {
      localStorage.clear();
      alert("Local data cleared successfully!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings | CloudClip</title>
        <meta
          name="description"
          content="Customize your CloudClip experience."
        />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="glass rounded-2xl p-6 animate-slide-in">
            <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              {darkMode ? <Moon className="h-5 w-5 text-indigo-500" /> : <Sun className="h-5 w-5 text-amber-500" />}
              Appearance
            </h2>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${darkMode ? "bg-indigo-500" : "bg-gray-300"
                  }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${darkMode ? "translate-x-7" : "translate-x-1"
                  }`}>
                  {darkMode ? (
                    <Moon className="h-3.5 w-3.5 text-indigo-500" />
                  ) : (
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass rounded-2xl p-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-500" />
              Preferences
            </h2>

            {/* Auto-clear Timer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">Auto-clear Timer</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Automatically clear local clipboard content
                  </p>
                  <select
                    value={autoClearMinutes}
                    onChange={(e) => setAutoClearMinutes(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 
                      rounded-xl text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                      transition-all duration-300"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={0}>Never</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Default Encryption */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Default Encryption</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Always enable password protection
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDefaultEncryption(!defaultEncryption)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${defaultEncryption ? "bg-green-500" : "bg-gray-300"
                  }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${defaultEncryption ? "translate-x-7" : "translate-x-1"
                  }`} />
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className="glass rounded-2xl p-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Data Management
            </h2>

            <div className="space-y-3">
              <button
                onClick={clearLocalData}
                className="w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                  rounded-xl text-left hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-red-500" />
                  <div>
                    <h3 className="font-medium text-red-600 dark:text-red-400">Clear Local Data</h3>
                    <p className="text-sm text-red-500/70 dark:text-red-400/70">
                      Remove all locally stored preferences and history
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* About */}
          <div className="glass rounded-2xl p-6 animate-slide-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-500" />
              About
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">CloudClip</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Version 2.0.0</p>
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 
                  rounded-full text-xs font-medium">
                  Latest
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <Heart className="h-5 w-5 text-pink-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Made with love for everyone
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl 
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                    flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Github className="h-5 w-5" />
                  <span className="font-medium">GitHub</span>
                  <ExternalLink className="h-4 w-4 opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 animate-fade-in">
            <p>
              Your data is encrypted and automatically deleted after 24 hours.
              <br />
              We don't track or store personal information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
