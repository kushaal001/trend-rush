import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '../button';
import { Calendar } from '../calendar';


interface DateTimePickerProps {
  open: boolean;
  handleDropdown: (open: boolean) => void;
  onChange: (date: Date) => void;
  placeholder: string;
  toYear?: number;
  fromYear?: number;
  value: Date;
  isDisabled?: boolean;
  showTime?: boolean;
  handleTimeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timeValue?: string;
  timeLabel?: string;
  mode?: string;
}
export default function DateTimePicker(props: any) {
  const {
    handleDropdown, onChange, handleTimeChange, timeValue,
    timeLabel,
    placeholder, toYear, fromYear, isDisabled = false, mode = "single",
    value, showTime,
  } = props;
  const [open, setOpen] = useState(false);

  return (

    <Popover open={open} onOpenChange={(value) => {
      setOpen(value); if (handleDropdown) {
        handleDropdown(value)
      }
    }}>
      <PopoverTrigger asChild>
        <Button
          id="pd-dob-button"
          variant="outline"
          style={{ boxShadow: "none" }}
          className={cn(
            "w-full justify-start text-left px-3 py-[5px] border  rounded-[10px] h-max border-[#d1d5db] font-normal hover:bg-gray-50 ",
            value == null && "text-muted-foreground",
            isDisabled && "bg-gray-100 cursor-not-allowed"
          )}
          onClick={() => {
            if (!isDisabled) {
              setOpen(!open)
              if (handleDropdown) {
                handleDropdown(!open);
              }
            }
          }}
          disabled={isDisabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value != null ? (
            format(value, showTime ? 'dd-MM-yyyy HH:mm' : 'dd-MM-yyyy')
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode={mode}
          selected={value}
          captionLayout="dropdown-buttons"
          disabled={isDisabled}
          className={cn("m-auto flex items-center justify-center border-black")}
          fromYear={fromYear}
          toYear={toYear}
          onSelect={(e: any): any => {
            onChange(e);
            setOpen(false)
            if (handleDropdown) {
              handleDropdown(false)
            }
          }}
          footer={showTime && (
            <p className='p-3'>
              Pick a time:
              <input
                type="time"
                name={timeLabel}
                className="block w-full rounded-[4px] border border-gray-300 px-2 py-[6.5px] font-sans text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm sm:leading-6"
                value={timeValue ?? ""}
                onChange={(e) => {
                  handleTimeChange(e);
                }}
                min="09:00"
                max="16:00"
                required
              />
            </p>
          )
          }
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
