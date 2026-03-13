import { cn } from "@/lib/utils";

export interface PannelProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * 一个简单的包装组件，将主要前景色应用于其子元素。
 */
export default function Pannel({ children, className }: PannelProps) {
  return (
    <div className={cn("bg-background text-foreground", className)}>
      {children}
    </div>
  );
}
