import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{(error as any)?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
