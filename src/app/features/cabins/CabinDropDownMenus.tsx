import type { Cabin } from "@/api/cabin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { HiEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import CabinForm from "./CabinForm";
import { useOptimisticDeleteCabin } from "./useCabins";

interface CabinDropDownMenusProps {
  cabin: Cabin;
}

export default function CabinDropDownMenus({ cabin }: CabinDropDownMenusProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const deleteMutation = useOptimisticDeleteCabin();

  if (!cabin) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-md p-1.5 transition-all duration-200 hover:bg-accent">
          <HiEllipsisVertical className="size-6" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="" align="end">
          <DropdownMenuGroup>
            {/* 编辑 */}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpenEdit(true)}
            >
              <HiPencil />
              <span className="ml-2">Edit</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* 删除 */}
            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              onClick={() => setDeleteConfirmOpen(true)}
            >
              <HiTrash />
              <span className="ml-2">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 编辑表单组件 */}
      <CabinForm cabin={cabin} open={openEdit} openChange={setOpenEdit} />

      {/* 删除确认组件 */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this cabin? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                setDeleteConfirmOpen(false);
                deleteMutation.mutate(cabin.Id!);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
