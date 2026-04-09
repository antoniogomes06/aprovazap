import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-[10px] transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1";

    const variants = {
      primary:
        "bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)]",
      secondary:
        "bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] border border-[var(--border-color)]",
      success:
        "bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-[0_4px_16px_rgba(34,197,94,0.25)]",
      danger:
        "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-[0_4px_16px_rgba(239,68,68,0.25)]",
      ghost:
        "hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    };

    const sizes = {
      sm: "text-sm px-3 py-2 h-8",
      md: "text-[15px] px-6 py-3 h-11",
      lg: "text-[16px] px-6 h-14 w-full rounded-[14px] font-bold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
