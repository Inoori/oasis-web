import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useTheme } from "@/components/theme-provider";
import type { color } from "motion/react";

type SalesChartProps = {
  bookings: { CreatedAt: string; TotalPrice: number; ExtrasPrice: number }[];
  numDays: number;
};

const chartConfig = {
  totalSales: {
    label: "Total Sales",
    color: "var(--chart-1)",
  },
  extrasSales: {
    label: "Extras Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function SalesChart({ bookings, numDays }: SalesChartProps) {
  const isDarkMode = useTheme().theme === "dark";

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((date) => ({
    label: format(date, "MMM dd"),

    totalSales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.CreatedAt!)))
      .reduce((acc, booking) => acc + booking.TotalPrice!, 0),

    extrasSales: bookings
      .filter((booking) => isSameDay(date, new Date(booking.CreatedAt!)))
      .reduce((acc, booking) => acc + booking.ExtrasPrice!, 0),
  }));

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      };

  return (
    <div
      className={cn(
        "col-span-full flex flex-col items-center justify-center rounded-md bg-accent px-8 py-6"
      )}
    >
      <h2 className="self-start text-2xl font-semibold">
        Sales from {format(allDays.at(0)!, "MMM dd yyyy")} to{" "}
        {format(allDays.at(-1)!, "MMM dd yyyy")}
      </h2>

      <ChartContainer config={chartConfig} className="h-74 min-h-60 w-full">
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            fill={colors.totalSales.fill}
            fillOpacity={0.4}
            stroke={colors.totalSales.stroke}
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            fill={colors.extrasSales.fill}
            fillOpacity={0.4}
            stroke={colors.extrasSales.stroke}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
