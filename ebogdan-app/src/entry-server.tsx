import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";
import { themeConfig } from "./config/theme";

export function render(url: string) {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <ConfigProvider theme={themeConfig}>
        <App />
      </ConfigProvider>
    </MemoryRouter>,
  );
}
