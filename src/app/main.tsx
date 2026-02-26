import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import App from './App';
import "@/style.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* todo: add error boundary */}
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
      onReset={() => window.location.replace("/")}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
