import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[16px] p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
