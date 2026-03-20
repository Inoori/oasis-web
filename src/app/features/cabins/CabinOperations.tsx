import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

import CabinForm from "./CabinForm";
import { useState } from "react";
// import { motion } from "motion/react";

import { useQueryClient } from "@tanstack/react-query";
import { CABINS_TABLE } from "./useCabins";

export default function CabinOperations() {
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  return (
    <>
      <ButtonGroup>
        <Button
          variant="outline"
          size="sm"
          className="active:translate-y-0.5"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: [CABINS_TABLE] })
          }
        >
          Refresh
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="active:translate-y-0.5"
          onClick={() => setCreateOpen(true)}
        >
          New Cabin
        </Button>
      </ButtonGroup>

      {/* 新建cabin 表单 */}
      <CabinForm open={createOpen} openChange={setCreateOpen} />
    </>
  );
}
