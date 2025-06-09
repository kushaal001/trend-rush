import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { GenericPhoneNumberProps } from '@/lib/types/generics';
import { FieldValues } from 'react-hook-form';

export default function GenericPhoneNumber<T extends FieldValues>(props: GenericPhoneNumberProps<T>) {
  const { form, phoneCodeOptions, name, label, placeholder, required, setPhoneCode, phoneCode, disabled = false } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className={cn(
              required && 'after:text-red-600 after:content-["*"]',
              'text-black'
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex">
              <div className={cn("flex border border-gray-200 hover:border-black text-gray-600 p-[1px] rounded-md text-sm w-full",
                disabled && 'bg-gray-100 cursor-not-allowed'
              )}>
                <select
                  title="select"
                  id={`${name}-countryId`}
                  className="h-full rounded-md border-0 bg-transparent pl-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm py-2"
                  value={phoneCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setPhoneCode(value);
                    }
                  }}
                  disabled={disabled}
                >
                  {phoneCodeOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.calling_code}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder={placeholder}
                  maxLength={10}
                  min={0}
                  className={cn("px-2 py-2 h-full w-full focus:outline-none ",
                    disabled && 'bg-gray-100 cursor-not-allowed'
                  )}
                  id={name}
                  {...field}
                  disabled={disabled}
                />
              </div>
            </div>
          </FormControl>
          <FormMessage id={`${name}-errors-message`} />
        </FormItem>
      )}
    />
  );
}
