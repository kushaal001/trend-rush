
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { GenericCheckboxProps } from '@/lib/types/generics';
import { cn } from '@/lib/utils';

import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

export function GenericCheckbox<T extends FieldValues>({
  label,
  required = false,
  name,
  form,
  onChange,
  disabled = false,
}: GenericCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }: { field: ControllerRenderProps<T> }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormControl className="flex items-center space-x-2">
              <Checkbox
                {...field}
                id={name}
                name={name}
                checked={field.value}
                className=' '
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (onChange) {
                    onChange(checked);
                  }
                }}
                disabled={disabled}
              />
            </FormControl>
            <FormLabel
              htmlFor={name}
              className={cn(
                required && "after:text-red-600 after:content-['*']",
                'text-black text-sm font-medium leading-none', "text-primary_text_color"
              )}
            >
              {label}
            </FormLabel>
          </div>
          <FormMessage id={`${name}-errors-message`} />
        </FormItem>
      )}
    />
  );
}
