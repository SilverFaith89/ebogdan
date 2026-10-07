import "antd/dist/reset.css";

import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM, { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { themeConfig } from "./config/theme";

const app = (
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider theme={themeConfig}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);
const root = document.getElementById("root")!;

if (root.hasAttribute("data-ssr")) {
  hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}

// Register service worker in production to enable offline support and resource caching
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((err) => {
        console.warn('ServiceWorker registration failed: ', err);
      });
  });
}