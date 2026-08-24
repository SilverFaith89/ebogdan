import "antd/dist/reset.css";

import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { themeConfig } from "./config/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider theme={themeConfig}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// Register service worker in production to enable offline support and resource caching
if ('serviceWorker' in navigator) {
  // Only register in production builds
  if ((import.meta as any).env && (import.meta as any).env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          // Registration successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((err) => {
          console.warn('ServiceWorker registration failed: ', err);
        });
    });
  }
}