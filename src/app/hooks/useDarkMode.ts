import { useContext } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";

/**
 * useDarkMode - 一个自定义 Hook，用于访问 DarkModeContext 中的暗模式状态和更新函数
 * @returns { isDarkMode: boolean, setIsDarkMode: (value: boolean) => void }
 */
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
