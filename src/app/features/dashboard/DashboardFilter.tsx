import Filter from "@/components/Filter";

export default function DashboardFilter() {
  return (
    <Filter
      searchParamName={"last"}
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ]}
    />
  );
}
