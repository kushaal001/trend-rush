import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { addYears } from "date-fns";
import { ReactNode } from "react";
import DatePicker from "../date-picker";

export default function FormDatePicker<T extends FieldValues>({
  form,
  submitLoader,
  name,
  required,
  label,
  className,
  beforeDisableDate,
  afterDisableDate = addYears(new Date(), 2),
  placeholder = "Pick a date",
  render,
  onChangeHandler,
  isTimePicker = false,
  disabled = false,
}: {
  form: UseFormReturn<T>;
  submitLoader: boolean;
  name: Path<T>;
  required?: boolean;
  label: string;
  className?: string;
  beforeDisableDate?: Date;
  afterDisableDate?: Date;
  render?: (params: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  }) => ReactNode;
  placeholder?: string;
  onChangeHandler?: (date: Date | undefined, onChange: (value: Date | undefined) => void) => void;
  isTimePicker?: boolean;
  disabled?: boolean;
}) {
  function renderDatePicker(dateValue: Date | undefined, handleDateChange: (date: Date | undefined) => void) {
    if (isTimePicker) {
      return (
        <DatetimePicker
          date={dateValue}
          setDate={handleDateChange}
          disabled={submitLoader || disabled}
          beforeDisableDate={beforeDisableDate}
          afterDisableDate={afterDisableDate}
          placeholder={placeholder}
          className="w-full"
        />
      );
    }
    return (
      <DatePicker
        date={dateValue}
        setDate={handleDateChange}
        disabled={submitLoader || disabled}
        beforeDisableDate={beforeDisableDate}
        afterDisableDate={afterDisableDate}
        placeholder={placeholder}
        className="w-full"
      />
    );
  }
  return (
    <FormField<T, typeof name>
      name={name}
      control={form.control}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => {
        const dateValue = field.value
          ? (typeof field.value === "string" ? new Date(field.value) : field.value)
          : undefined;

        const handleDateChange = (date: Date | undefined) => {
          if (onChangeHandler) {
            onChangeHandler(date, field.onChange);
          } else {
            field.onChange(date);
          }
        };

        return (
          <FormItem className={className}>
            <FormLabel htmlFor={name} required={required}>{label}</FormLabel>
            <FormControl>
              {render ? (
                render({
                  value: dateValue,
                  onChange: handleDateChange
                })
              ) : (renderDatePicker(dateValue, handleDateChange))}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}