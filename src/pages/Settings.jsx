import React, { useState } from "react";
import { Moon, Clock, CreditCard } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [autoClearMinutes, setAutoClearMinutes] = useState(15);
  const [isProUser, setIsProUser] = useState(false);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Settings
      </h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-1" />
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Auto-clear Timer
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Automatically clear clipboard content after specified time
              </p>
              <select
                value={autoClearMinutes}
                onChange={(e) => setAutoClearMinutes(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value={5}>5 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-3">
            <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-1" />
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Pro Features
                </h3>
                {isProUser ? (
                  <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                    Free
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Upgrade to Pro for ad-free experience and extended features
              </p>
              {!isProUser && (
                <button
                  onClick={() => setIsProUser(true)}
                  className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                >
                  Upgrade to Pro
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
