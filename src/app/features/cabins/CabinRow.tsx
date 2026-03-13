import type { Cabin } from "@/api/cabin";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/helps";
import CabinDropDownMenus from "./CabinDropDownMenus";

export default function CabinRow({ cabin }: { cabin: Cabin }) {
  const imageUrl = "./default-cabin.jpg";

  return (
    <TableRow>
      <TableCell>
        <img
          src={imageUrl}
          alt="Cabin"
          className="aspect-3/2 w-32 min-w-24 object-cover object-center"
        />
      </TableCell>
      <TableCell>
        <div className="text-base font-medium">{cabin.Name}</div>
      </TableCell>
      <TableCell>
        <div>First up to {cabin.MaxCapacity} guests</div>
      </TableCell>
      <TableCell>
        <div className="flex shrink font-semibold">
          {formatCurrency(cabin.RegularPrice)}
        </div>
      </TableCell>
      <TableCell>
        {cabin.Discount ? (
          <div className="font-medium text-green-700">{cabin.Discount}</div>
        ) : (
          <span>&mdash;</span>
        )}
      </TableCell>

      <TableCell>
        <CabinDropDownMenus cabin={cabin} />
      </TableCell>
    </TableRow>
  );
}
