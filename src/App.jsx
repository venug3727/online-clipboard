import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import History from "./pages/History";
import Snippets from "./pages/Snippets";
import Settings from "./pages/Settings";
import CustomUrl from "./pages/CustomUrl";
import FileSharing from "./pages/FileSharing";
import QRGenerator from "./pages/QRGenerator.jsx";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/send"
            element={
              <Layout>
                <Send />
              </Layout>
            }
          />
          <Route
            path="/receive"
            element={
              <Layout>
                <Receive />
              </Layout>
            }
          />
          <Route
            path="/history"
            element={
              <Layout>
                <History />
              </Layout>
            }
          />
          <Route
            path="/snippets"
            element={
              <Layout>
                <Snippets />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route
            path="/custom-url"
            element={
              <Layout>
                <CustomUrl />
              </Layout>
            }
          />
          <Route
            path="/file-sharing"
            element={
              <Layout>
                <FileSharing />
              </Layout>
            }
          />
          <Route
            path="/qr-generator"
            element={
              <Layout>
                <QRGenerator />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
