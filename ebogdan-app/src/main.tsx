import "antd/dist/reset.css";

import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { themeConfig } from "./config/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider theme={themeConfig}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);