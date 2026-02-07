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
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 transition ${className}`}
    >
      {children}
    </button>
  );
}
