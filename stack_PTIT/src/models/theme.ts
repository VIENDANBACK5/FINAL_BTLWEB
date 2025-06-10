import { useState, useEffect } from "react";
import { message, theme } from "antd";

// Theme configs cho Ant Design
const getAntdTheme = (isDark: boolean) => ({
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorBgContainer: isDark ? "#141414" : "#ffffff",
    colorBgElevated: isDark ? "#1f1f1f" : "#ffffff",
    colorBgLayout: isDark ? "#000000" : "#f5f5f5",
    colorBorder: isDark ? "#434343" : "#d9d9d9",
    colorText: isDark ? "#ffffffd9" : "#000000d9",
  },
});

export default function useTheme() {
  // Khởi tạo theme từ localStorage hoặc mặc định là 'light'
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Cập nhật theme khi thay đổi
  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Cập nhật data-theme attribute
    document.documentElement.setAttribute("data-theme", theme);

    // Cập nhật class trên body (giữ tương thích)
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
  }, [theme]);

  // Chuyển đổi theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    message.success(
      `Đã chuyển sang giao diện ${newTheme === "light" ? "sáng" : "tối"}`
    );
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark",
    antdTheme: getAntdTheme(theme === "dark"),
  };
}
