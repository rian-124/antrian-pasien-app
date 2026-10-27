import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  isLoading = false,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3",
        "text-sm font-semibold text-white transition-colors",
        "hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
        </svg>
      )}
      {children}
    </button>
  );
}