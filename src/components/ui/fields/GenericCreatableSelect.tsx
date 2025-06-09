// components/common/fields/CreatableSelectDropdown.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { CreatableSelectDropdownProps } from '@/lib/types/generics';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import Creatable from 'react-select/creatable';

const customStyles: any = {
  menuPortal: (base: any) => ({ ...base, zIndex: 999 }),
};

export function GenericCreatableSelect<T extends FieldValues>({
  options,
  form,
  name,
  getOptionLabel,
  getOptionValue,
  label,
  onChange,
  isMulti = false,
  id,
  required = false,
  disabled = false,
}: CreatableSelectDropdownProps<T>) {
  const getLabel = (option: any) =>
    getOptionLabel ? getOptionLabel(option) : option.label || option.name;
  const getValue = (option: any) =>
    getOptionValue ? getOptionValue(option) : option.value || option.id;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T> }) => (
        <FormItem>
          <FormLabel
            htmlFor={id || name}
            className={cn(
              required && 'after:text-red-600 after:content-["*"]',
              'text-black'
            )}
          >
            {label}
          </FormLabel>
          <Creatable
            {...field}
            isMulti={isMulti}
            id={name}
            allowCreateWhileLoading
            styles={customStyles}
            getOptionLabel={getLabel}
            getOptionValue={getValue}
            closeMenuOnSelect={!isMulti}
            isSearchable
            isDisabled={disabled}
            options={options as any}
            instanceId={id || name}
            isClearable
            onChange={(value, actionMeta) => {
              field.onChange(value);
              if (onChange) {
                onChange(value, actionMeta);
              }
            }}
            menuPortalTarget={
              typeof document !== 'undefined'
                ? document.querySelector('body')
                : null
            }
          />
          <FormMessage id={`${name}-errors-message`} />
        </FormItem>
      )}
    />
  );
}
