"use client";

import { CalendarIcon } from "lucide-react";
import { addYears, format } from "date-fns";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";

interface DatePickerProps {
  label?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  beforeDisableDate?: Date | undefined;
  afterDisableDate?: Date;
  disabled?: boolean;
  placeholder?: string;
}

export function DatetimePicker({
  className,
  date,
  setDate,
  disabled,
  beforeDisableDate = undefined,
  afterDisableDate = addYears(new Date(), 2),
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>(date ? new Date(date).toTimeString().slice(0, 5) : "00:00");
  const handleToggle = () => setIsOpen(!isOpen);

  const calendarRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={cn("grid col-span-1 gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild onClick={handleToggle}>
        <Button
          type="button"
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP HH:mm") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 flex items-start"
        align="start"
      >
        <div ref={calendarRef}>
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            defaultMonth={date}
            onSelect={(selectedDate:any) => {
              if (selectedDate) {
                const [hours, minutes] = time.split(":");
                selectedDate.setHours(
                  parseInt(hours),
                  parseInt(minutes)
                );
                setDate(selectedDate);
              }
            }}
            disabled={(date:any) => {
              if (beforeDisableDate && date < beforeDisableDate) return true;
              if (afterDisableDate && date > afterDisableDate) return true;
              return false;
            }}
          />
        </div>
        <div className="w-[120px] my-4 mr-2">
            <ScrollArea className="h-[18rem]">
            <div className="flex flex-col gap-2 h-full">
              {Array.from({ length: 96 }).map((_, i) => {
              const hour = Math.floor(i / 4)
                .toString()
                .padStart(2, "0");
              const minute = ((i % 4) * 15)
                .toString()
                .padStart(2, "0");
              const timeValue = `${hour}:${minute}`;
              const isSelected = timeValue === time;
              return (
                <Button
                key={i}
                ref={(el) => {
                  // Store reference to the selected button
                  if (isSelected && el && isOpen) {
                  // Use setTimeout to ensure ScrollArea is rendered
                  setTimeout(() => {
                    el.scrollIntoView({ block: "center", behavior: "smooth" });
                  }, 100);
                  }
                }}
                className="w-full text-left px-2"
                variant={isSelected ? "default" : "outline"}
                onClick={() => {
                  setTime(timeValue);
                  if (date) {
                  const newDate = new Date(date.getTime());
                  newDate.setHours(
                    parseInt(hour),
                    parseInt(minute)
                  );
                  setDate(newDate);
                  setIsOpen(false);
                  }
                }}
                >
                {timeValue}
                </Button>
              );
              })}
            </div>
            </ScrollArea>
        </div>
      </PopoverContent>
      </Popover>
      </div>
  );
}