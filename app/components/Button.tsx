"use client";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "filled" | "outline";
};

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "filled",
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg transition font-medium flex items-center justify-center";

  const variantStyles =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
      : "bg-black text-white hover:bg-black/90";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
