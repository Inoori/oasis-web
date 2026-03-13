import { Button } from "@/components/ui/button";
import {
  Empty as EmptyComponent,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HiBuildingLibrary, HiArrowLongLeft } from "react-icons/hi2";
import { useMoveBack } from "@/hooks/useMoveBack";
import CabinForm from "@/features/cabins/CabinForm";
import { useState } from "react";

export default function Empty() {
  const moveBack = useMoveBack();
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  return (
    <>
      <EmptyComponent className="justify-start">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HiBuildingLibrary />
          </EmptyMedia>
          <EmptyTitle>No Cabin Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any cabins yet. Get started by creating
            your first cabin.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="flex-row justify-center gap-2">
          <Button
            className="cursor-pointer"
            onClick={() => setOpenCreate(true)}
          >
            Create Cabin
          </Button>

          <Button
            variant="outline"
            onClick={moveBack}
            className="cursor-pointer"
          >
            <HiArrowLongLeft />
            Go Back
          </Button>
        </EmptyContent>
      </EmptyComponent>

      <CabinForm open={openCreate} openChange={setOpenCreate} />
    </>
  );
}
