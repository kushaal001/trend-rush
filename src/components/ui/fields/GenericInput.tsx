import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';
import { GenericInputProps } from '@/lib/types/generics';
import Link from 'next/link';
import { Fragment, useReducer } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Input } from '../input';

export default function GenericInput<T extends FieldValues>({
  label,
  type = 'text',
  placeholder,
  required = false,
  maxLength,
  name,
  onChange,
  form,
  isNumber,
  inputType = 'text',
  disabled,
  min,
  isPasted,
  max,
  onKeyDown,
}: GenericInputProps<T>) {
  const [showPassword, togglePassword] = useReducer((state) => !state, false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'Enter' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Delete' ||
        e.key === 'Tab' ||
        (/\d/.test(e.key) && e.key.length === 1)
      )
    ) {
      e.preventDefault();
    }
  };

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  function renderInput(field: ControllerRenderProps<T>) {
    const commonInputProps = {
      id: name,
      type,
      className: ' rounded-[10px] py-2.5 px-3 border-input_border_color ',
      placeholder,
      onKeyDown: onKeyDown ? onKeyDown : isNumber ? handleKeyDown : undefined,
      maxLength,
      min,
      disabled,
      onPaste: isPasted ? handlePaste : undefined,
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        if(onChange){
          onChange(e)
        }else{
          field.onChange(files[0]);
        }
      } else {
        console.log("No files selected.");
      }
    };

    switch (inputType) {
      case 'password':
        return (
          <div className=""></div>
          // <PasswordInput
          //   type={showPassword ? 'text' : 'password'}
          //   placeholder={placeholder}
          //   id={name}
          //   className=' rounded-[10px] py-2.5 px-3 border-input_border_color'
          //   {...field}
          //   value={field.value ?? ""}
          //   data-cy="login-input-password"
          //   autoComplete="off"
          //   showPassword={showPassword}
          //   togglePassword={togglePassword}
          // />
        );
      case 'file':
        return (
          <Fragment>
            <Input
              id={name}
              type="file"
              className='bg-white border-[var(--input_border_color)] rounded-[10px] py-2.5 px-3'
              max={max}
              onChange={(e) => handleFileChange(e)}
            />
            {typeof form.watch(name) === 'string' && (
              <Link
                target="_blank"
                href={form.watch(name)}
                className='text-blue-700 text-sm hover:text-blue-800'
              >
                {form.watch(name).split('/').pop()}
              </Link>
            )}
          </Fragment>
        );
      default:
        return (
          <Input
            {...commonInputProps}
            {...field}
            value={field.value ?? ''}
            className='bg-white'
            onChange={(e) => {
              const text = type === 'number' ? Number(e.target.value) : e.target.value;
              if(onChange){
                onChange(text)
              }else{
                field.onChange(text);
              }
            }}
          />
        );
    }
  }

  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }: { field: ControllerRenderProps<T> }) => (
        <FormItem className=' space-y-[13px]'>
          <FormLabel
            className={cn(
              required && 'after:text-red-600 after:content-["*"]',
              'text-black text-primary_text_color'
            )}
          >
            {label}
          </FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage id={`${name}-errors-message`} />
        </FormItem>
      )}
    />
  );
}
