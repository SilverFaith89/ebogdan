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