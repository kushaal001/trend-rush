import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addYears, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  beforeDisableDate?: Date | undefined;
  afterDisableDate?: Date;
  disabled?: boolean;
  placeholder?: string;
}

export default function DatePicker({
  className,
  date,
  setDate,
  disabled,
  beforeDisableDate = undefined,
  afterDisableDate = addYears(new Date(), 2),
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <div className={cn("grid col-span-1 gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild onClick={handleToggle}>
          <Button
            type="button"
            id="date"
            variant={"calendar"}
            className={cn(
              "w-full justify-start text-left px-3 py-3 rounded-[10px] h-max border-input_border_color font-normal hover:border-2 hover:border-black",
              !date && "text-muted-foreground",
            )}
            size="lg"
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={(date:any) => {
              if (beforeDisableDate && date < beforeDisableDate) return true;
              if (afterDisableDate && date > afterDisableDate) return true;
              return false;
            }}
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(date:any) => {
              setDate(date);
              setIsOpen(false);
            }}
            className="w-full bg-white p-3 rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
