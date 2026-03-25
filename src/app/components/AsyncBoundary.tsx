import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/ErrorPage";

type AsyncBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  spinnerClassName?: string;
  ErrorFallbackComponent?: ErrorBoundary["props"]["FallbackComponent"];
};

/**
 * A reusable component that wraps its children with Suspense and ErrorBoundary.
 */
export default function AsyncBoundary({
  children,
  fallback,
  spinnerClassName,
  ErrorFallbackComponent = ErrorPage,
}: AsyncBoundaryProps) {
  return (
    <Suspense
      fallback={
        fallback || (
          <Spinner className={cn("mx-auto size-12", spinnerClassName)} />
        )
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
}
