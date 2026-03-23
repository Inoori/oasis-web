import { useTheme } from "@/components/theme-provider";
import type { BookingWithRelations } from "../bookings/BookingTable";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
type DurationChartProps = {
  confirmedStays: BookingWithRelations[];
};

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    fill: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    fill: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    fill: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    fill: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    fill: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    fill: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    fill: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    fill: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    fill: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    fill: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    fill: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    fill: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    fill: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    fill: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    fill: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    fill: "#7e22ce",
  },
];

function prepareData(
  startData: typeof startDataLight,
  stays: BookingWithRelations[]
) {
  if (!stays || stays.length === 0) return undefined;

  function incArrayValue(arr: typeof startDataLight, field: string) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.NumNights!;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const chartConfig = {
  value: {
    label: "number of stays",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function DurationChart({ confirmedStays }: DurationChartProps) {
  const { theme } = useTheme();
  const startData = theme === "dark" ? startDataDark : startDataLight;

  const data = prepareData(startData, confirmedStays);

  return (
    <div
      className={cn(
        "col-span-2 flex flex-col items-center justify-center rounded-md bg-accent px-8 py-6",
        "md:col-span-2 md:col-start-1",
        "xl:col-span-2 xl:col-start-3"
      )}
    >
      <h2 className="self-start text-2xl font-semibold">
        Stay duration summary
      </h2>
      <ChartContainer config={chartConfig} className="h-full">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            innerRadius={60}
            strokeWidth={5}
            fill="var(--color-value)"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
