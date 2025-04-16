import React, { useState } from "react";
import {
  Search,
  Pin,
  Trash,
  Copy,
  ExternalLink,
  Image,
  FileText,
} from "lucide-react";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    {
      id: "1",
      content: "https://example.com",
      type: "link",
      isConfidential: false,
      code: "1234",
      createdAt: new Date(),
      isPinned: true,
    },
    {
      id: "2",
      content: "Important meeting notes for tomorrow",
      type: "text",
      isConfidential: true,
      code: "5678",
      createdAt: new Date(),
    },
  ]);

  const filteredItems = items.filter((item) =>
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const togglePin = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "link":
        return <ExternalLink className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          History
        </h1>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history..."
            className="w-64 px-4 py-2 pl-10 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-grow">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    {item.isConfidential && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                        Confidential
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900 dark:text-white break-all">
                    {item.content}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => copyToClipboard(item.content)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  onClick={() => togglePin(item.id)}
                  className={`p-2 ${
                    item.isPinned
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  <Pin className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No items in history
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
