import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "@dr.pogodin/react-helmet"; // ✅ import HelmetProvider
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
