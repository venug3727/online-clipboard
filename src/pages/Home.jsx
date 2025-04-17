import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Download,
  Shield,
  Clock,
  Zap,
  History,
  Bookmark,
  Settings,
  Link as LinkIcon,
  FileText,
  QrCode,
  Menu,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>BMSClipboard | Secure Cross-Device Clipboard Sharing</title>
        <meta name="application-name" content="BMSClipboard" />
        <meta name="apple-mobile-web-app-title" content="BMSClipboard" />
        <meta
          name="description"
          content="BMSCE/BMSIT's official clipboard sharing. Securely share text, links, and files between devices with end-to-end encryption."
        />
        <meta
          name="keywords"
          content="BMSClipboard, BMSCE, BMSIT, BMS College of Engineering, BMS Institute of Technology, Bull Temple Road, Basavanagudi, Bangalore campus, clipboard sharing, secure file transfer, cross-device sync, end-to-end encryption"
        />
        <meta name="author" content="BMS Development Team" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="BMSClipboard" />
        <meta itemProp="description" content="Secure clipboard sharing for BMSCE/BMSIT students and faculty" />
        <meta itemProp="image" content="https://bmsclipboard.example.com/logo.png" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://bmsclipboard.example.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BMSClipboard" />
        <meta property="og:description" content="Secure clipboard sharing for BMSCE/BMSIT community" />
        <meta property="og:image" content="https://bmsclipboard.example.com/logo.png" />
        <meta property="og:site_name" content="BMSClipboard" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BMSClipboard" />
        <meta name="twitter:description" content="Secure clipboard sharing for BMSCE/BMSIT community" />
        <meta name="twitter:image" content="https://bmsclipboard.example.com/logo.png" />
        <meta name="twitter:site" content="@BMSClipboard" />
        <meta name="twitter:creator" content="@BMSClipboard" />
        
        {/* Institution Specific Tags */}
        <meta name="institution" content="BMSCE, BMSIT" />
        <meta name="campus" content="Bangalore" />
        <meta name="organization" content="BMS Educational Trust" />
        
        {/* Google Ads Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460974170228372" crossorigin="anonymous"></script>
      </Helmet>

      {/* ALL EXISTING CONTENT REMAINS EXACTLY THE SAME BELOW THIS LINE */}
      <div className="flex min-h-screen">
        {/* Mobile Menu Button */}

        {/* Main Content */}
        <div className="flex-1  min-h-screen">
          <div className="px-4 py-12 md:px-8 mx-auto max-w-7xl">
            <div className="text-center">
              <div className="animate-float mb-8">
                <div className="w-24 h-24 bg-gradient rounded-full flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <Send className="h-12 w-12 text-white transform -rotate-45" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-slide-in">
                Welcome to ClipVault
              </h1>
              <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in">
                Securely share clipboard content with end-to-end encryption. No
                registration required. Just generate a code and share.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto mb-16 stagger-animate">
              <Link
                to="/send"
                className="group flex items-center justify-center space-x-3 px-6 py-4 md:px-8 md:py-6 bg-gradient text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Send className="h-6 w-6 md:h-8 md:w-8 group-hover:animate-pulse" />
                <span className="text-lg md:text-xl font-semibold">
                  Send Clipboard
                </span>
              </Link>

              <Link
                to="/receive"
                className="group flex items-center justify-center space-x-3 px-6 py-4 md:px-8 md:py-6 glass rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Download className="h-6 w-6 md:h-8 md:w-8 text-indigo-600 dark:text-indigo-400 group-hover:animate-pulse" />
                <span className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  Receive Clipboard
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mx-auto stagger-animate">
              <div className="p-6 md:p-8 glass rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 mx-auto">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  Secure Sharing
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
                  End-to-end encryption for confidential content with optional
                  encryption keys.
                </p>
              </div>

              <div className="p-6 md:p-8 glass rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  No Registration
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
                  Share instantly with 4-digit codes. No account or login
                  required.
                </p>
              </div>

              <div className="p-6 md:p-8 glass rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 mx-auto">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  Auto-Clear
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
                  Content automatically clears after a set time for enhanced
                  security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}