import { cn } from "@/lib/utils";
import { PostStatus } from "@/types";

const statusConfig = {
  pending: {
    label: "Pendente",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  },
  approved: {
    label: "Aprovado",
    className: "bg-green-500/15 text-green-400 border-green-500/20",
  },
  rejected: {
    label: "Rejeitado",
    className: "bg-red-500/15 text-red-400 border-red-500/20",
  },
};

export function StatusBadge({ status }: { status: PostStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
