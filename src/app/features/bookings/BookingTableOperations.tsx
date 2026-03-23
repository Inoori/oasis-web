import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";

export default function BookingTableOperations() {
  return (
    <div className="flex items-center justify-between">
      <div className="mb-1 flex items-center gap-4">
        <Filter
          searchParamName="Status"
          options={[
            { value: "all", label: "All" },
            { value: "CheckedOut", label: "checked out" },
            { value: "CheckedIn", label: "checked in" },
            { value: "UnConfirmed", label: "unconfirmed" },
          ]}
        />
        <SortBy
          options={[
            { value: "StartDate desc", label: "Sort by date (recent first)" },
            { value: "StartDate asc", label: "Sort by date (earlier first)" },
            {
              value: "TotalPrice desc",
              label: "Sort by amount (high first)",
            },
            { value: "TotalPrice asc", label: "Sort by amount (low first)" },
          ]}
        />
      </div>
    </div>
  );
}
