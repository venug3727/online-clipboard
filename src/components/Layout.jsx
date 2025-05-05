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
import { Helmet } from "react-helmet";
import { useTheme } from "../context/ThemeContext";

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isActive = (path) => location.pathname === path;

  // Handle window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Page load effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Load AdSense script properly
  useEffect(() => {
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    if (windowWidth <= 768) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg flex justify-between items-center p-4">
        <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
          <Clipboard className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
            BMS Clipboard
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Sidebar/Navigation */}
      <aside
        className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 fixed h-full z-40 transition-all duration-300 ${
          mobileMenuOpen ? "left-0" : "-left-64"
        } md:left-0 md:relative`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-400 rounded-lg blur" />
              <Clipboard className="h-8 w-8 text-indigo-600 dark:text-indigo-400 relative z-10" />
            </div>
            <Link to="/" onClick={closeMobileMenu}>
              <span className="text-xl font-bold">BMS Clipboard</span>
            </Link>
          </div>
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
              onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>

          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-4"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 mr-3 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 mr-3 text-indigo-600" />
            )}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="md:ml-64 md:mt-[-500px] min-h-screen pt-16 md:pt-0">
        {/* Loading Indicator */}
        <div
          className={`h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 fixed top-0 left-0 right-0 z-50 ${
            isLoading ? "w-full" : "w-0"
          }`}
        >
          <div className="h-full w-1/4 bg-indigo-300 dark:bg-indigo-500 animate-loading"></div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around p-2">
          {[
            { to: "/send", icon: Send, label: "Send" },
            { to: "/receive", icon: Download, label: "Receive" },
            { to: "/file-sharing", icon: FileText, label: "Files" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive(to)
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              onClick={closeMobileMenu}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
