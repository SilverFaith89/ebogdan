import type { ThemeConfig } from "antd";
import { theme } from "antd";

export const themeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#12a5a0",
    colorInfo: "#12a5a0",
    colorSuccess: "#198754",
    colorWarning: "#d98e04",
    colorError: "#d64545",
    colorTextBase: "#111111",
    colorBgBase: "#ffffff",
    colorBorder: "#d9e4e3",
    colorLink: "#087f7b",
    borderRadius: 4,
    borderRadiusLG: 6,
    controlHeight: 40,
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
  },
  components: {
    Button: {
      fontFamily: "system-ui, 'Segoe UI', sans-serif",
      fontWeight: 600,
      borderRadius: 4,
    },
    Card: {
      borderRadiusLG: 6,
    },
    Input: {
      borderRadius: 4,
    },
    Select: {
      borderRadius: 4,
    },
  },
};