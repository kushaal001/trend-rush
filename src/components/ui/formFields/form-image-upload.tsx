import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "@/components/ui/input";

export default function FormImageUpload<T extends FieldValues>({
  form,
  submitLoader,
  name,
  required,
  label,
  className,
  previewSize = "h-[50px] w-[50px]",
  fallbackImage = "/no_image_found.png",
  inputProps = {},
}: {
  form: UseFormReturn<T>;
  submitLoader: boolean;
  name: Path<T>;
  required?: boolean;
  label: string;
  className?: string;
  previewSize?: string;
  fallbackImage?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'type' | 'disabled' | 'className'> & {
    onChange?: (value: any) => void;
  };
}) {
  return (
    <FormField<T, typeof name>
      name={name}
      control={form.control}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            field.onChange(file);
            // Call custom onChange if provided
            if (inputProps.onChange) {
              inputProps.onChange(file);
            }
          }
        };

        // Get image source: if value is a File, create an object URL; otherwise use value as is
        const getImageSrc = () => {
          if (!field.value) return fallbackImage;
          return (field.value && typeof field.value !== "string"
            ? URL.createObjectURL(field.value)
            : field.value) || fallbackImage;
        };

        return (
          <FormItem className={className}>
            <FormLabel htmlFor={name} required={required}>{label}</FormLabel>
            <FormControl>
              <div className="flex space-x-2 my-auto">
                <div className={`flex items-center justify-center border p-1 overflow-hidden rounded-lg mt-1 mb-1 ${previewSize}`}>
                  <img
                    src={getImageSrc()}
                    alt="Preview"
                    className="size-auto rounded-sm"
                  />
                </div>
                <div className="my-auto flex-1">
                  <Input
                    type="file"
                    disabled={submitLoader}
                    {...inputProps}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}