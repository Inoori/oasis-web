import { Suspense } from "react";
import { useParams } from "react-router-dom";
import CheckinBooking from "@/features/check-in-out/CheckinBooking";
import { Spinner } from "@/components/ui/spinner";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/ErrorPage";

export default function Checkin() {
  const { id } = useParams();

  return (
    <Suspense fallback={<Spinner className="mx-auto size-12" />}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <CheckinBooking key={id} />
      </ErrorBoundary>
    </Suspense>
  );
}
