import { useParams } from "react-router-dom";
import CheckinBooking from "@/features/check-in-out/CheckinBooking";
import AsyncBoundary from "@/components/AsyncBoundary";

export default function Checkin() {
  const { id } = useParams();

  return (
    <AsyncBoundary>
      <CheckinBooking key={id} />
    </AsyncBoundary>
  );
}
