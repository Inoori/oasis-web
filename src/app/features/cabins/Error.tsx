import { Button } from "@/components/ui/button";
import {
  Empty as EmptyComponent,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useMoveBack } from "@/hooks/useMoveBack";
import { HiArrowLongLeft, HiMiniFaceFrown } from "react-icons/hi2";

export default function Error({ message }: { message: string }) {
  const moveBack = useMoveBack();
  return (
    <EmptyComponent className="">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HiMiniFaceFrown />
        </EmptyMedia>
        <EmptyTitle>Error</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="flex-row justify-center">
        <Button onClick={moveBack} className="cursor-pointer">
          <HiArrowLongLeft />
          Go Back
        </Button>
      </EmptyContent>
    </EmptyComponent>
  );
}
