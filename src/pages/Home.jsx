import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Send,
  Download,
  Shield,
  Clock,
  Zap,
  FileText,
  Link as LinkIcon,
  QrCode,
  ArrowRight,
  Sparkles,
  Lock,
  Globe
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "All transfers use AES-256 encryption with optional password protection.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Transfer speeds up to 1Gbps. Perfect for large files and quick sharing.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Clock,
      title: "Auto-Expiry",
      description: "Content automatically deletes after 24 hours. Your privacy is guaranteed.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const tools = [
    {
      to: "/send",
      icon: Send,
      title: "Send Clipboard",
      description: "Share text or code snippets securely with a unique code",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      to: "/receive",
      icon: Download,
      title: "Receive Clipboard",
      description: "Access shared content using a 4-digit code",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      to: "/file-sharing",
      icon: FileText,
      title: "File Sharing",
      description: "Upload and share files up to 100MB with anyone",
      gradient: "from-orange-500 to-red-500",
    },
    {
      to: "/custom-url",
      icon: LinkIcon,
      title: "URL Shortener",
      description: "Create memorable short links for any URL",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      to: "/qr-generator",
      icon: QrCode,
      title: "QR Generator",
      description: "Generate QR codes for URLs, text, or any content",
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>CloudClip | Secure File & Text Sharing</title>
        <meta
          name="description"
          content="Transfer files up to 100MB and text snippets between devices with end-to-end encryption. No registration required."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 text-center">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-float" />
            <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          {/* Icon */}
          <div className="relative inline-block mb-8 animate-bounce-in">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-50 animate-pulse-slow" />
            <div className="relative p-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl shadow-2xl shadow-indigo-500/30">
              <Send className="h-12 w-12 text-white transform -rotate-45" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-in">
            Secure File Transfer
            <span className="block text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: "0.1s" }}>
            Send files up to 100MB or text snippets with military-grade encryption.
            Works across all devices with no installation needed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/send"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 
                text-white rounded-2xl font-semibold text-lg shadow-lg shadow-indigo-500/30 
                hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <Send className="h-5 w-5" />
              <span>Send Files</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/receive"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 glass-strong
                text-gray-900 dark:text-white rounded-2xl font-semibold text-lg
                hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300"
            >
              <Download className="h-5 w-5 text-indigo-500" />
              <span>Receive Content</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-500" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>No Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>100% Free</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-10">
            Why Choose CloudClip?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 glass rounded-2xl card-hover animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4
                  shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-4">
            All-in-One Sharing Tools
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            Everything you need to share content securely, all in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group p-5 glass rounded-2xl card-hover-lift flex items-start gap-4 animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${tool.gradient}
                  shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <tool.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                    {tool.title}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-12">
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-10">
              Perfect For Every Use Case
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </span>
                  Professional Use
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Send contract drafts to clients securely
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Share presentation files before meetings
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Transfer large design assets between teams
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </span>
                  Personal Use
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Share vacation photos with family
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Send recipes or shopping lists quickly
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Transfer files between your own devices
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} CloudClip. All rights reserved.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            A free file sharing service for everyone. No account required.
          </p>
        </footer>
      </div>
    </>
  );
}
