import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { GenericTextAreaProps } from '@/lib/types/generics';
import { cn } from '@/lib/utils';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Textarea } from '../textarea';


export function GenericTextArea<T extends FieldValues>({
  label,
  required,
  name,
  form,
  placeholder,
  disabled,
}: GenericTextAreaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }: { field: ControllerRenderProps<T> }) => (
        <FormItem className="py-1 ">
          <FormLabel
            className={cn(
              required && 'after:text-red-600 after:content-["*"]',
              'text-black'
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              id={name}
              {...field}
              className="h-20  border-gray-200"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage id={`${name}-errors-message`} />
        </FormItem>
      )}
    />
  );
}
