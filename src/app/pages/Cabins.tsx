// import Pagination from "@/components/Pagination";
import Pannel from "@/components/Pannel";
import CabinTable from "@/features/cabins/CabinTable";
import CabinTableOperations from "@/features/cabins/CabinTableOperations";

export default function Cabins() {
  return (
    <>
      <h1 className="text-3xl">All cabins</h1>

      <Pannel className="mt-6">
        <CabinTableOperations />
        <CabinTable />
      </Pannel>
    </>
  );
}
