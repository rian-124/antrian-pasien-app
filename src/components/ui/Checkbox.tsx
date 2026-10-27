import { InputHTMLAttributes, useId } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {label}
    </label>
  );
}