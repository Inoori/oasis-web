import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label?: string;
  value: string;
}

export interface FilterProps {
  searchParamName: string;
  options?: FilterOption[];
}

export default function Filter({ searchParamName, options = [] }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!options || options.length === 0) return null;

  const currentFilter =
    searchParams.get(searchParamName) || options?.at(0)?.value;

  function handleClick(value: string) {
    if (value === currentFilter) return;
    searchParams.set(searchParamName, value);
    if (searchParams.has("page")) searchParams.set("page", "1");
    if (value?.toLowerCase() === "all") searchParams.delete(searchParamName);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-1 rounded-sm p-1">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleClick(option.value)}
          variant="outline"
          className={cn(
            option.value === currentFilter &&
              "bg-primary! text-primary-foreground!",
            "transition-colors duration-200"
          )}
        >
          {option.label || option.value}
        </Button>
      ))}
    </div>
  );
}
