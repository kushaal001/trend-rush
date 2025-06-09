import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import CustomSelect from "../custom-select";

export default function FormSelect<
  T extends FieldValues,
  O extends Record<string, unknown> | string | number = Record<string, unknown>
>({
  form,
  submitLoader,
  name,
  required,
  label,
  placeholder = "Select an option",
  options = [],
  isLoading = false,
  getOptionLabel,
  getOptionValue,
  className,
  selectProps = {},
}: {
  form: UseFormReturn<T>;
  submitLoader: boolean;
  name: Path<T>;
  required?: boolean;
  label: string;
  placeholder?: string;
  options?: O[];
  isLoading?: boolean;
  getOptionLabel?: (option: O) => string;
  getOptionValue?: (option: O) => string | number;
  className?: string;
  selectProps?: Record<string, unknown> & {
    onChange?: (newValue: any, actionMeta: any) => void;
  };
}) {
  // Default handlers that work with different types of option objects
  const defaultGetOptionLabel = (option: O): string => {
    if (option === null || option === undefined) return "";
    if (typeof option === "string" || typeof option === "number") return String(option);

    // For object types
    if (typeof option === "object") {
      // Try common properties for labels
      const objOption = option as Record<string, unknown>;
      if ("label" in objOption && objOption.label) return String(objOption.label);
      if ("name" in objOption && objOption.name) return String(objOption.name);
      if ("title" in objOption && objOption.title) return String(objOption.title);
      if ("text" in objOption && objOption.text) return String(objOption.text);
      if ("value" in objOption && objOption.value) return String(objOption.value);
    }
    return String(option);
  };

  const defaultGetOptionValue = (option: O): string => {
    if (option === null || option === undefined) return "";
    if (typeof option === "string" || typeof option === "number") return String(option);

    // For object types
    if (typeof option === "object") {
      // Try common properties for values
      const objOption = option as Record<string, unknown>;
      if ("value" in objOption && objOption.value) return String(objOption.value);
      if ("id" in objOption && objOption.id) return String(objOption.id);
      if ("key" in objOption && objOption.key) return String(objOption.key);
      if ("code" in objOption && objOption.code) return String(objOption.code);
    }
    return String(option);
  };

  const finalGetOptionLabel = getOptionLabel || defaultGetOptionLabel;
  const finalGetOptionValue = getOptionValue || defaultGetOptionValue;


  return (
    <FormField<T, typeof name>
      name={name}
      control={form.control}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => {
        // Create a composite onChange function
        const composedOnChange = (newValue: any, actionMeta: any) => {
          // First call the original field.onChange to update form state
          field.onChange(newValue);

          // Then call the custom onChange from selectProps if it exists
          if (selectProps.onChange) {
            selectProps.onChange(newValue, actionMeta);
          }
        };

        return (
          <FormItem className={className}>
            <FormLabel htmlFor={name} required={required}>{label}</FormLabel>
            <FormControl>
              <CustomSelect
                options={options}
                isLoading={isLoading}
                placeholder={placeholder}
                getOptionLabel={finalGetOptionLabel}
                getOptionValue={(option) => String(finalGetOptionValue(option))}
                disabled={submitLoader}
                {...field}
                {...selectProps}
                onChange={composedOnChange} // Use the composed onChange
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}