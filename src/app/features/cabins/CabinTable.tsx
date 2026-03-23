import type { Cabin } from "@/api/cabin";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "@/features/cabins/useCabins";
import Error from "@/features/cabins/Error";
import { Spinner } from "@/components/ui/spinner";
import Empty from "@/features/cabins/Empty";
import _ from "lodash";

export default function CabinTable() {
  const [searchParams] = useSearchParams();

  const { data, isLoading, error } = useCabins();

  const cabins = data?.value as unknown as Cabin[]; // 直接断言为 Cabin 数组

  //todo: 修改为后端过滤和排序
  const filter = (searchParams.get("filter") ||
    "all") as keyof typeof filterMap;

  const sortBy = (searchParams.get("sort") ||
    "name-asc") as keyof typeof sortMap;

  const filterMap = {
    all: (cabins: Cabin[]) => [...cabins],
    "no-discount": (cabins: Cabin[]) =>
      cabins.filter((cabin) => cabin.Discount === 0),
    "with-discount": (cabins: Cabin[]) =>
      cabins.filter((cabin) => cabin.Discount && cabin.Discount > 0),
  };

  const sortMap = {
    "name-asc": (cabins: Cabin[]) =>
      cabins.sort((a, b) => a.Name!.localeCompare(b.Name!)),
    "name-desc": (cabins: Cabin[]) =>
      cabins.sort((a, b) => b.Name!.localeCompare(a.Name!)),
    "price-asc": (cabins: Cabin[]) =>
      cabins.sort((a, b) => a.RegularPrice! - b.RegularPrice!),
    "price-desc": (cabins: Cabin[]) =>
      cabins.sort((a, b) => b.RegularPrice! - a.RegularPrice!),
  };

  if (isLoading) return <Spinner className="mx-auto size-12" />;

  if (error) return <Error message={error.message} />;

  if (!cabins || cabins.length === 0) return <Empty />;

  const filteredCabins =
    cabins.length === 0 ? cabins : (filterMap[filter]?.(cabins) ?? cabins);
  const sortedCabins =
    filteredCabins.length === 0
      ? filteredCabins
      : (sortMap[sortBy]?.(filteredCabins) ?? filteredCabins);

  return (
    <div className={cn("rounded-md border")}>
      <Table className="font-[Sono]">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>MaxCapacity</TableHead>
            <TableHead>RegularPrice</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCabins.map((cabin) => (
            <CabinRow key={cabin.Id} cabin={cabin} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
