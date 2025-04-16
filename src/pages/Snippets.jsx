import React, { useState } from "react";
import { Plus, Edit2, Trash, Copy, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Snippets() {
  const [snippets, setSnippets] = useState([
    {
      id: "1",
      name: "Email Signature",
      content: "Best regards,\nJohn Doe\nSoftware Engineer",
      createdAt: new Date(),
    },
  ]);
  const [isEditing, setIsEditing] = useState(null);
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(null);

  const addSnippet = (e) => {
    e.preventDefault();
    if (newName && newContent) {
      setSnippets([
        ...snippets,
        {
          id: Date.now().toString(),
          name: newName,
          content: newContent,
          createdAt: new Date(),
        },
      ]);
      setNewName("");
      setNewContent("");
      setShowForm(false);
    }
  };

  const updateSnippet = (id, name, content) => {
    setSnippets(
      snippets.map((snippet) =>
        snippet.id === id ? { ...snippet, name, content } : snippet
      )
    );
    setIsEditing(null);
  };

  const deleteSnippet = (id) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  const copyToClipboard = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>ClipVault - Manage Your Code Snippets</title>
        <meta
          name="description"
          content="Save and organize your frequently used code snippets and text with ClipVault's snippet manager."
        />
        <meta
          name="keywords"
          content="code snippets, text snippets, clipboard manager, productivity tools"
        />
        <meta property="og:title" content="ClipVault Snippet Manager" />
        <meta
          property="og:description"
          content="Organize and access your frequently used code and text snippets"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Snippets
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          aria-label="Add new snippet"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Snippet
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <form onSubmit={addSnippet}>
            <div className="mb-4">
              <label
                htmlFor="snippet-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Snippet Name
              </label>
              <input
                id="snippet-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter snippet name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="snippet-content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Content
              </label>
              <textarea
                id="snippet-content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full h-32 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter snippet content"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Save Snippet
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {snippets.map((snippet) => (
          <article
            key={snippet.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            {isEditing === snippet.id ? (
              <div>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full h-32 px-4 py-2 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      updateSnippet(snippet.id, newName, newContent)
                    }
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                    itemProp="name"
                  >
                    {snippet.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        copyToClipboard(snippet.id, snippet.content)
                      }
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      aria-label="Copy snippet to clipboard"
                    >
                      {copied === snippet.id ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(snippet.id);
                        setNewName(snippet.name);
                        setNewContent(snippet.content);
                      }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      aria-label="Edit snippet"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteSnippet(snippet.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      aria-label="Delete snippet"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <pre
                  className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                  itemProp="text"
                >
                  {snippet.content}
                </pre>
                <meta
                  itemProp="dateCreated"
                  content={snippet.createdAt.toISOString()}
                />
              </>
            )}
          </article>
        ))}

        {snippets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No snippets saved
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
