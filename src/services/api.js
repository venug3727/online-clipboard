const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendClipboard = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/clipboard/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const receiveClipboard = async (code, decryptionKey) => {
  const response = await fetch(`${API_BASE_URL}/api/clipboard/receive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, decryption_key: decryptionKey }),
  });
  return await response.json();
};

// Add other API functions similarly
