import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantClass = {
  primary:   "az-btn-primary",
  secondary: "az-btn-secondary",
  success:   "az-btn-success",
  danger:    "az-btn-danger",
  ghost:     "az-btn-ghost",
};

const sizeClass = {
  sm: "az-btn-sm",
  md: "az-btn-md",
  lg: "az-btn-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn("az-btn", variantClass[variant], sizeClass[size], className)}
      {...props}
    >
      {loading && <span className="spinner" />}
      {children}
    </button>
  )
);

Button.displayName = "Button";
