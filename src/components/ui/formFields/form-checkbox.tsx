import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { HTMLAttributes } from "react";

export default function FormCheckbox<T extends FieldValues>({
  form,
  submitLoader,
  name,
  label,
  className,
  checkboxProps = {},
  labelProps = {},
}: {
  form: UseFormReturn<T>;
  submitLoader: boolean;
  name: Path<T>;
  label: string;
  className?: string;
  checkboxProps?: HTMLAttributes<HTMLButtonElement>;
  labelProps?: HTMLAttributes<HTMLLabelElement>;
}) {
  return (
    <FormField<T, typeof name>
      name={name}
      control={form.control}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem className={`my-auto ${className || ""}`}>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value || false}
                onCheckedChange={(e: boolean) => field.onChange(e)}
                disabled={submitLoader}
                {...checkboxProps}
              />
            </FormControl>
            <FormLabel className="text-black" {...labelProps}>{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}