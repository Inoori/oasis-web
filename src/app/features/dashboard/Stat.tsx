import { cn } from "@/lib/utils";

type StatProps = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  className?: string;
  iconClassName?: string;
};

export default function Stat({
  title,
  icon,
  value,
  className,
  iconClassName,
}: StatProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1 rounded-md border border-solid border-primary-foreground bg-accent p-4",
        className
      )}
    >
      <div
        className={cn(
          "row-span-full flex aspect-[1] items-center justify-center rounded-full",
          iconClassName
        )}
      >
        {icon}
      </div>
      <h5 className="self-end text-xs font-semibold tracking-tight text-muted-foreground uppercase">
        {title}
      </h5>
      <p className="text-2xl leading-none font-medium">{value}</p>
    </div>
  );
}
