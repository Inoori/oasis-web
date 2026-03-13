import type { Cabin } from "@/api/cabin";
import { formatCurrency } from "@/lib/helps";
import type { ColumnDef } from "@tanstack/react-table";
import CabinDropDownMenus from "./CabinDropDownMenus";

export const columns: ColumnDef<Cabin>[] = [
  {
    accessorKey: "Image",
    header: "",
    cell: ({ row }) => {
      //todo: use real image url from data
      // const imageUrl = row.original.image;
      const imageUrl = "./default-cabin.jpg";

      return (
        <img
          src={imageUrl}
          alt="Cabin"
          className="aspect-3/2 object-cover object-center w-32 min-w-24"
        />
      );
    },
  },
  {
    accessorKey: "Name",
    header: "CABIN",
    cell: ({ row }) => {
      const name = row.original.Name;
      return <div className="text-base font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "MaxCapacity",
    header: "CAPACITY",
    cell: ({ row }) => {
      const maxCapacity = row.original.MaxCapacity;
      return <div>First up to {maxCapacity} guests</div>;
    },
  },
  {
    accessorKey: "RegularPrice",
    header: "PRICE",
    cell: ({ row }) => {
      const regularPrice = row.original.RegularPrice;
      return (
        <div className="flex shrink font-semibold">
          {formatCurrency(regularPrice)}
        </div>
      );
    },
  },
  {
    accessorKey: "Discount",
    header: "DISCOUNT",
    cell: ({ row }) => {
      const discount = row.original.Discount;
      return discount ? (
        <div className="font-medium text-green-700">{discount}</div>
      ) : (
        <span>&mdash;</span>
      );
    },
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => <CabinDropDownMenus cabin={row.original} />,
  },
];
