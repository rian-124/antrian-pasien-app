"use client";

import { forwardRef, InputHTMLAttributes, useId, useState } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, error, type = "text", className = "", ...props }, ref) {
    const id = useId();
    const errorId = `${id}-error`;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={[
              "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900",
              "placeholder:text-gray-400 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              error ? "border-red-400" : "border-gray-300",
              isPassword ? "pr-16" : "",
              className,
            ].join(" ")}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 rounded-r-lg px-4 text-xs font-medium text-gray-500 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>

        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);