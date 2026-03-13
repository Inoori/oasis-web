import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectValue = searchParams.get("sort") || options?.at(0)?.value;

  return (
    <Select
      defaultValue={selectValue}
      onValueChange={(value) => {
        searchParams.set("sort", value);
        setSearchParams(searchParams);
      }}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
