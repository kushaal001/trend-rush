import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { Input } from "@/components/ui/input";

export default function FormInput<T extends FieldValues>({
  form,
  submitLoader,
  name,
  required,
  label,
  placeholder = "Enter Value",
  type = "text",
  autoComplete,
  className,
  showPrefix = false,
  prefixContent,
  isPasswordInput = false,
  onPasswordToggle,
  inputProps = {},
}: {
  form: UseFormReturn<T>;
  submitLoader: boolean;
  name: Path<T>;
  required?: boolean;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  className?: string;
  showPrefix?: boolean;
  prefixContent?: ReactNode;
  isPasswordInput?: boolean;
  onPasswordToggle?: (show: boolean) => void;
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'type' | 'placeholder' | 'autoComplete' | 'disabled' | 'className'> & {
      onChange?: (value: any) => void;
    };
}) {
  const finalType = isPasswordInput ? "password" : type;
  const finalAutoComplete = autoComplete ||
    (isPasswordInput ? "new-password" : `new-${String(name)}`);

  return (
    <FormField<T, typeof name>
      name={name}
      control={form.control}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => {
        const composedOnChange = (value: string | number | undefined): void => {
          const parsedValue = type === "number" && value !== undefined ? Number(value) : value;

          field.onChange(parsedValue);

          if (inputProps.onChange) {
            inputProps.onChange(value);
          }
        };
        return (
        <FormItem className={className}>
          <FormLabel htmlFor={name} required={required}>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={finalType}
              autoComplete={finalAutoComplete}
              disabled={submitLoader}
              showPrefix={showPrefix}
              prefixContent={prefixContent}
              isPasswordInput={isPasswordInput}
              onPasswordToggle={onPasswordToggle}
              {...inputProps}
              {...field}
              value={field.value ?? ""}
              onChange={(event) => composedOnChange(event.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}}
    />
  );
}