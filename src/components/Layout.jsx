import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Clipboard,
  Sun,
  Moon,
  Settings,
  History,
  Bookmark,
  Send,
  Download,
  Link as LinkIcon,
  FileText,
  QrCode,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 fixed md:static h-full z-40 transition-all duration-300 ${
          mobileMenuOpen ? "left-0" : "-left-64 md:left-0"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute md:ml-[0px] ml-[80px] inset-0 bg-indigo-400 rounded-lg blur" />
              <Clipboard className="h-8 md:ml-[0px] ml-[80px] w-8 text-indigo-600 dark:text-indigo-400 relative z-10" />
            </div>
            <Link to="/">
              <span className="text-xl  font-bold">ClipVault</span>
            </Link>
          </div>
          {/* <button
            className="md:hidden p-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button> */}
        </div>

        <nav className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Clipboard
          </h3>

          {[
            { to: "/send", icon: Send, label: "Send Clipboard" },
            { to: "/receive", icon: Download, label: "Receive Clipboard" },
            
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive(to)
                  ? "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Link>
          ))}

          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-4 mb-1">
            Content
          </h3>

          {[
            
            { to: "/custom-url", icon: LinkIcon, label: "Custom URLs" },
            { to: "/file-sharing", icon: FileText, label: "File Sharing" },
            { to: "/qr-generator", icon: QrCode, label: "QR Generator" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive(to)
                  ? "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Link>
          ))}

          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-4 mb-1">
            Settings
          </h3>

          <Link
            to="/settings"
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              isActive("/settings")
                ? "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>

          {/* Dark Mode Toggle in Sidebar */}
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 mr-3 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 mr-3 text-indigo-600" />
            )}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </nav>
      </div>

      {/* Main Content with Topbar */}
      <div className="md:ml-64 md:mt-[-400px] min-h-screen">
        <div className="fixed top-0 right-0 left-0 md:left-64 z-30">
          <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-14">
                {/* Logo for Mobile */}
                <div className="flex items-center md:hidden">
                  <Link to="/" className="flex items-center">
                    <Clipboard className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                    <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                      ClipVault
                    </span>
                  </Link>
                </div>

                {/* Right Buttons - Removed dark mode toggle from here */}
                <div className="flex items-center space-x-3">
                  {/* Empty now since we removed the dark mode toggle */}
                </div>
              </div>
            </div>
          </nav>

          {/* Loading Indicator */}
          <div
            className={`h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 ${
              isLoading ? "w-full" : "w-0"
            }`}
          >
            <div className="h-full w-1/4 bg-indigo-300 dark:bg-indigo-500 animate-loading"></div>
          </div>
        </div>

        {/* Page Content */}
        <main className="pt-14 pb-16 px-4 sm:px-5 lg:px-6">{children}</main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t dark:border-gray-700 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around py-2">
              {[
                { to: "/", icon: Clipboard, label: "Home" },
                { to: "/history", icon: History, label: "History" },
                { to: "/snippets", icon: Bookmark, label: "Snippets" },
              ].map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-col items-center transform hover:scale-105 transition-transform duration-200 ${
                    isActive(to)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-0.5">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
