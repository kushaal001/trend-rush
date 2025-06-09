import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { GenericDatePickerProps } from "@/lib/types/generics";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { TimePicker } from "../time-picker";

export default function GenericDatePicker<T extends FieldValues>(
  props: GenericDatePickerProps<T>
) {
  const { form, label, name, required, side, align } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, field: { onChange, value } }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className={cn(
              required && 'after:text-red-600 after:content-["*"]',
              "text-black", "text-primary_text_color"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <DatePicker
              {...props}
              value={value}
              onChange={onChange}
              field={field}
              {...(side && { side: side })}
              {...(align && { align: align })}
            />
          </FormControl>
          <FormMessage id={`${name}-errors-message`} />
        </FormItem>
      )}
    />
  );
}

export function DatePicker({
  value,
  onChange,
  field,
  side,
  align,
  ...restProps
}: any) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  // const startYear = Number(format(subYears(new Date(), 50), "yyyy"));
  // const endYear = Number(format(addYears(new Date(), 30), "yyyy"));

  const {
    name,
    placeholder,
    // toYear,
    // fromYear,
    disabled,
    isDisabled = false,
    withTime,
    form,
  } = restProps;
  return (
    <Popover
      open={openCalendar}
    onOpenChange={setOpenCalendar}
    >
      <PopoverTrigger className=" " asChild>
        <Button
          id={name}
          style={{ boxShadow: "none" }}
          variant="outline"
          className={cn(
            "w-full justify-start text-left px-3 py-2 rounded-[10px] h-max border-input_border_color font-normal hover:border-2 hover:border-black",
            value == null && "text-muted-foreground",
            isDisabled && "bg-gray-100 cursor-not-allowed"
          )}
          onClick={() => {
            if (!isDisabled) {
              setOpenCalendar(!openCalendar);
            }
          }}
          disabled={isDisabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value != null ? (
            !withTime ? (
              format(value, "PPP")
            ) : (
              format(value, "PPP HH:mm:ss")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className=" bg-white w-full z-[10000] rounded-lg border border-gray-300 shadow-lg"
        {...(side && { side: side })}
        {...(align && { align: align })}
      >
        <div className="relative"></div>
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown-buttons"
          disabled={disabled}
          className={cn(
            "m-auto flex items-center justify-center border-black "
          )}
          // fromYear={fromYear || startYear}
          // toYear={toYear || endYear}
          required
          onSelect={(e: any) => {
            onChange(e);
            if (form) {
              form.clearErrors(name);
            }
            if (!withTime) {
              setOpenCalendar(false); // Close if no time picker is required
            }
          }}
          {...field}
        />
        {withTime && <TimePicker setDate={(date) => {
      onChange(date);
    }} date={value} />}
      </PopoverContent>
    </Popover>
  );
}
