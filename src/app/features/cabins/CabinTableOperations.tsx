import Filter from "@/components/Filter";
import SortBy from "../../components/SortBy";
import CabinOperations from "./CabinOperations";

export default function CabinTableOperations() {
  return (
    <div className="flex items-center justify-between">
      <div className="mb-1 flex items-center gap-4">
        <Filter
          searchParamName="filter"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No Discount" },
            { value: "with-discount", label: "With Discount" },
          ]}
        />
        <SortBy
          options={[
            {
              value: "name-asc",
              label: "Name (A-Z)",
            },
            {
              value: "name-desc",
              label: "Name (Z-A)",
            },
            {
              value: "price-asc",
              label: "Price (Low to High)",
            },
            {
              value: "price-desc",
              label: "Price (High to Low)",
            },
          ]}
        />
      </div>

      <CabinOperations />
    </div>
  );
}
