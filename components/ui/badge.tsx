import { cn } from "@/lib/utils";
import { PostStatus } from "@/types";

const statusMap = {
  pending:  { label: "Pendente",  cls: "az-badge-pending"  },
  approved: { label: "Aprovado",  cls: "az-badge-approved" },
  rejected: { label: "Rejeitado", cls: "az-badge-rejected" },
};

export function StatusBadge({ status }: { status: PostStatus }) {
  const { label, cls } = statusMap[status];
  return <span className={cn("az-badge", cls)}>{label}</span>;
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
      className={cn("az-badge", className)}
      style={{
        backgroundColor: "var(--bg-tertiary)",
        color: "var(--text-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      {children}
    </span>
  );
}
