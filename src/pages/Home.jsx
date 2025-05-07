import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Send, Download, Shield, Clock, Zap } from "lucide-react";
import AdSenseAd from "../components/AdSenseAd";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BMS Clipboard | Secure File & Text Sharing</title>
        <meta
          name="description"
          content="Transfer files up to 100MB and text snippets between devices with end-to-end encryption. No registration required."
        />
      </Helmet>

      <div className="flex-1 min-h-screen">
        <div className="px-4 py-12 md:px-8 mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <div className="animate-float mb-8">
              <div className="w-24 h-24 bg-gradient rounded-full flex items-center justify-center mb-6 shadow-lg mx-auto">
                <Send className="h-12 w-12 text-white transform -rotate-45" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Secure File Transfer Made Simple
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Send files up to 100MB or text snippets with military-grade
              encryption. Works across all devices with no installation needed.
            </p>
          </div>
          <div className="c">
            <h1 className="text-center py-[20px] text-lg font-semibold">
              Sponsors
            </h1>
            <AdSenseAd slotId="1101018584" className="my-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto mb-16">
            <Link
              to="/send"
              className="group flex items-center justify-center space-x-3 px-6 py-4 md:px-8 md:py-6 bg-gradient text-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Send className="h-6 w-6 md:h-8 md:w-8 group-hover:animate-pulse" />
              <span className="text-lg md:text-xl font-semibold">
                Send Files/Text
              </span>
            </Link>

            <Link
              to="/receive"
              className="group flex items-center justify-center space-x-3 px-6 py-4 md:px-8 md:py-6 glass rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Download className="h-6 w-6 md:h-8 md:w-8 text-indigo-600 dark:text-indigo-400 group-hover:animate-pulse" />
              <span className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                Receive Content
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mx-auto">
            <div className="p-6 md:p-8 glass rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                End-to-End Encryption
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
                All transfers use AES-256 encryption. Optional password
                protection available.
              </p>
            </div>

            <div className="p-6 md:p-8 glass rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                Lightning Fast
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
                Transfer speeds up to 1Gbps. Perfect for large files and quick
                sharing.
              </p>
            </div>

            <div className="p-6 md:p-8 glass rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                Auto-Expiry
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
                Content automatically deletes after 24 hours. Your privacy is
                guaranteed.
              </p>
            </div>
          </div>

          <AdSenseAd slotId="7843256991" className="my-8" />

          <div className="mt-16 mb-8 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Perfect For These Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 glass rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Professional Use
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Send contract drafts to clients</li>
                  <li>Share presentation files before meetings</li>
                  <li>Transfer large design assets between teams</li>
                </ul>
              </div>
              <div className="p-6 glass rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Personal Use
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Share vacation photos with family</li>
                  <li>Send recipes or shopping lists</li>
                  <li>Transfer files between your own devices</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} BMS Clipboard. All rights reserved.
            </p>
            <p className="mt-2">
              A free file sharing service for everyone. No account required.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
