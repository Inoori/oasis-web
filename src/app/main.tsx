import "reflect-metadata";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import "@/style.css";
import ErrorFallback from "./components/ErrorFallback";
import { registerErrorHandlers } from "./lib/errorHandle";

// 注册错误处理器
registerErrorHandlers();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
