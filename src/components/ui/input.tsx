import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react";

interface InputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  showPrefix?: boolean;
  prefixContent?: React.ReactNode;
  isPasswordInput?: boolean;
  onPasswordToggle?: (show: boolean) => void;
  type?: React.HTMLInputTypeAttribute;
}

export const Input = React.memo(({
  className,
  type = "text",
  showPrefix = false,
  prefixContent,
  isPasswordInput = false,
  onPasswordToggle,
  value,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handlePasswordToggle = React.useCallback(() => {
    const newShowPassword = !showPassword;
    setShowPassword(newShowPassword);

    inputRef.current?.focus();
    onPasswordToggle?.(newShowPassword);
  }, [showPassword, onPasswordToggle]);

  const inputType = React.useMemo(() => {
    if (isPasswordInput) {
      return showPassword ? "text" : "password";
    }
    return type;
  }, [isPasswordInput, showPassword, type]);

  const prefixElement = React.useMemo(() => {
    if (!showPrefix || !prefixContent) return null;
    return (
      <div className="block p-1 bg-gray-200 rounded-l-md">
        <span>{prefixContent}</span>
      </div>
    );
  }, [showPrefix, prefixContent]);

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[var(--input_border_color)]/60 rounded-[10px] flex",{"overflow-hidden": showPrefix }
      )}
    >
      {prefixElement}
      <input
        ref={inputRef}
        type={inputType}
        className={cn(
          "flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#80808a] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none", className, {"pr-10": isPasswordInput}
        )}
        value={value ?? ""}
        {...props}
      />
      {isPasswordInput && (
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
          onClick={handlePasswordToggle}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean;
  togglePassword?: () => void;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ className, type, showPassword, togglePassword, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "flex w-full rounded-sm border border-[#b3b3b3] bg-background py-1.5 pl-3 pr-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
        onClick={togglePassword}
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  );
},
);
PasswordInput.displayName = "Input";

export { PasswordInput }