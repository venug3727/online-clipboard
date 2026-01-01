import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Clipboard,
  Sun,
  Moon,
  Settings,
  Send,
  Download,
  Link as LinkIcon,
  FileText,
  QrCode,
  Menu,
  X,
  Home,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";
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
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Load AdSense script properly
  useEffect(() => {
    const loadAdSense = () => {
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement("script");
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }
    };

    // Only load on production
    if (process.env.NODE_ENV === "production") {
      loadAdSense();
    }
  }, []);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    if (windowWidth <= 768) {
      setMobileMenuOpen(false);
    }
  };

  const navItems = {
    main: [
      { to: "/", icon: Home, label: "Home" },
    ],
    clipboard: [
      { to: "/send", icon: Send, label: "Send Clipboard" },
      { to: "/receive", icon: Download, label: "Receive Clipboard" },
    ],
    tools: [
      { to: "/file-sharing", icon: FileText, label: "File Sharing" },
      { to: "/custom-url", icon: LinkIcon, label: "Custom URLs" },
      { to: "/qr-generator", icon: QrCode, label: "QR Generator" },
    ],
  };

  const NavLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      onClick={closeMobileMenu}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${isActive(to)
          ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 nav-active"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
        }`}
    >
      <div className={`p-2 rounded-lg transition-all duration-300 ${isActive(to)
        ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
        }`}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="font-medium">{label}</span>
      {isActive(to) && (
        <ChevronRight className="h-4 w-4 ml-auto text-indigo-400" />
      )}
    </Link>
  );

  const NavSection = ({ title, items }) => (
    <div className="mb-6">
      <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 gradient-mesh">
        <Helmet>
          <title>Secure File Sharing | CloudClip</title>
          <meta
            name="description"
            content="Share files up to 100MB with secure, encrypted links that automatically expire. No registration required."
          />
          <meta
            name="keywords"
            content="file sharing, secure transfer, encrypted upload, temporary file storage"
          />
        </Helmet>

        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass-strong shadow-lg">
          <div className="flex justify-between items-center p-4">
            <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur opacity-50" />
                <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <Clipboard className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-lg font-display font-bold text-gray-900 dark:text-white">
                CloudClip
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30 animate-fade-in"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-72 z-40 glass-strong border-r border-gray-200/50 dark:border-gray-800/50
            transform transition-transform duration-300 ease-out
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
              <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur opacity-50 animate-pulse-slow" />
                  <div className="relative p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/30">
                    <Clipboard className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                    CloudClip
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Secure & Fast
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <NavSection title="Overview" items={navItems.main} />
              <NavSection title="Clipboard" items={navItems.clipboard} />
              <NavSection title="Tools" items={navItems.tools} />
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 space-y-2">
              <Link
                to="/settings"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive("/settings")
                    ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
              >
                <div className={`p-2 rounded-lg ${isActive("/settings")
                  ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
                  }`}>
                  <Settings className="h-4 w-4" />
                </div>
                <span className="font-medium">Settings</span>
              </Link>

              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 
                  hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  {darkMode ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-indigo-500" />
                  )}
                </div>
                <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                <div className={`ml-auto w-10 h-6 rounded-full p-1 transition-colors duration-300 ${darkMode ? "bg-indigo-500" : "bg-gray-300"
                  }`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${darkMode ? "translate-x-4" : "translate-x-0"
                    }`} />
                </div>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="md:ml-72 min-h-screen pt-16 md:pt-0">
          {/* Loading Bar */}
          <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800 
            ${isLoading ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
            <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-shimmer" />
          </div>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8 min-h-screen pb-24 md:pb-8">
            <div className="animate-fade-in">
              {children}
            </div>

            {/* Footer - Desktop */}
            <footer className="hidden md:block mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    © {new Date().getFullYear()} CloudClip. All rights reserved.
                  </div>
                  <div className="flex items-center gap-6">
                    <Link
                      to="/privacy"
                      className="text-sm text-gray-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      to="/terms"
                      className="text-sm text-gray-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      Terms of Service
                    </Link>
                    <Link
                      to="/about"
                      className="text-sm text-gray-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      About
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-gray-200/50 dark:border-gray-800/50 safe-area-bottom">
          <div className="flex justify-around items-center p-2">
            {[
              { to: "/", icon: Home, label: "Home" },
              { to: "/send", icon: Send, label: "Send" },
              { to: "/receive", icon: Download, label: "Receive" },
              { to: "/file-sharing", icon: FileText, label: "Files" },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[60px] transition-all duration-200
                  ${isActive(to)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 dark:text-gray-400"
                  }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-200 ${isActive(to)
                  ? "bg-indigo-100 dark:bg-indigo-900/50"
                  : ""
                  }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
