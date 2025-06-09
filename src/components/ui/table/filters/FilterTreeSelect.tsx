import { cn } from "@/lib/utils";
import { FilterTreeSelectProps } from "@/lib/types/table";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronRight, XCircle } from 'lucide-react';
import { Fragment, useState } from "react";

export default function FilterTreeSelect({
  name,
  options,
  label,
  onChange,
  value,
  getOptionLabel,
  isLoading,
  onSearch,
  errorMessage,
  className,
  active,
  isMulti,
  innerRef,
}: FilterTreeSelectProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState<any[]>([]);

  const classes = cn(
    "relative border border-gray-300 dark:border-gray-300 rounded-lg h-[31px] w-full",
    active && "outline outline-offset-[0.3px] outline-[3.5px] outline-[#68a7ff] transition-all shadow-none focus:border-[#1d8cf8] ease-[cubic-bezier(0.4, 0, 0.2, 1)]",
    errorMessage && "outline outline-[1px] outline-red-600",
    className
  );

  const toggleExpansion = (itemId: any) => {
    setExpandedItems(prevExpandedItems =>
      prevExpandedItems.includes(itemId)
        ? prevExpandedItems.filter(id => id !== itemId)
        : [...prevExpandedItems, itemId]
    );
  };

  const generateTreeView = (optionData: any, level: any) =>
    optionData.map((option: any, index: number) => (
      <div
        className={cn(
          level === 0 && option.children && !option.children.length && "ml-6",
          level === 10 && option.children && !option.children.length && "ml-12",
          level === 10 && option.children && option.children.length && "ml-6",
          level === 20 && "ml-12"
        )}
        key={option.id}
      >
        <div className={cn("flex items-center gap-1.5 w-full", level !== 0 ? "h-full overflow-hidden px-3" : "h-[30px] px-3")}>
          {option.children && option.children.length > 0 && (
            <div
              id={`${name}-filter-dropdown-expand-${level}-${index}`}
              onClick={() => toggleExpansion(option.id)}
              className="w-[20px] h-[20px] border flex bg-white z-[3] relative items-center justify-center rounded-[7px]"
            >
              <ChevronRight className={cn("w-4 h-4", expandedItems.includes(option.id) && "transform rotate-90")} />
            </div>
          )}
          <ComboboxOption
            id={`${name}-filter-dropdown-option-${level}-${index}`}
            key={option.id}
            className={({ active }) => cn(
              value && value.id === option.id && "text-white bg-indigo-600",
              active ? "text-white bg-indigo-600" : "text-gray-900",
              "relative cursor-pointer select-none py-1.5 pl-1.5 pr-9 w-full"
            )}
            value={option}
          >
            {({ selected, active }) => (
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="relative h-[17px] w-[17px]">
                    <input
                      type="checkbox"
                      id={`${name}-filter-dropdown-checkbox-${level}-${index}`}
                      checked={
                        !isMulti ? value && value.id === option.id : value && Array.isArray(value) && value.some(item => item.id === option.id)
                      }
                      className="form-checkbox text-indigo-600 appearance-none bg-white dark:bg-[#0e1020] border border-[#a1a1a1] dark:border dark:border-dark-element-border-color rounded-[6px] checked:bg-transparent dark:checked:bg-transparent cursor-pointer relative z-[2] w-[17px] h-[17px]"
                    />
                    {(!isMulti ? value && value.id === option.id : value && Array.isArray(value) && value.some(item => item.id === option.id)) && (
                      <div className="absolute bg-blue-600 rounded-[7px] dark:bg-[#636aec] border-none dark:border dark:border-white h-[17px] w-[17px] z-[1] text-white top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                        <CheckIcon className="w-[13px] h-[13px]" />
                      </div>
                    )}
                  </div>
                  <p className={cn(selected ? "font-semibold" : "font-normal", "block truncate text-md")}>{getOptionLabel(option)}</p>
                </div>
              </div>
            )}
          </ComboboxOption>
        </div>
        {option.children && option.children.length > 0 && expandedItems.includes(option.id) && (
          <div className="mt-1">{generateTreeView(option.children, level + 10)}</div>
        )}
      </div>
    ));

  const onChangeHandler = (newValues: any) => {
    onChange(name, newValues || null);
  };

  const expandAll = () => {
    setIsExpanded(!isExpanded);
    const allExpandableItemIds: any[] = [];

    const findExpandableItemIds = (options: any) => {
      for (const option of options) {
        allExpandableItemIds.push(option.id);
        if (option.children) {
          findExpandableItemIds(option.children);
        }
      }
    };

    findExpandableItemIds(options);
    setExpandedItems(prev => (prev.length === allExpandableItemIds.length ? [] : allExpandableItemIds));
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={cn("absolute left-3 text-[14px] font-light text-xs ease-in duration-150 top-[50%] -translate-y-1/2 z-1 text-[#475569]")}>
          {isMulti ? label : value ? null : label}
        </label>
      )}
      <Combobox value={value} onChange={onChangeHandler} multiple={isMulti} ref={innerRef}>
        <div className="relative">
          <div className={classes}>
            <ComboboxButton id={`${name}-filter`} className="h-full outline-none w-full flex items-center pr-2">
              <ComboboxInput
                className={cn("w-full h-full border-none text-sm leading-5", value && "pt-0.5", "px-3 bg-transparent dark:text-white text-gray-900 focus:outline-none focus:ring-0 rounded-[4px]")}
                displayValue={(option) => (!isMulti && value ? getOptionLabel(value) : "")}
                onChange={(event) => onSearch && onSearch(event.target.value)}
              />
              {isMulti && value && value.length > 0 && (
                <div className="absolute top-[50%] opacity-80 pointer-events-none right-6 w-full h-[20px] bg-[#eaeaea] rounded-full text-[10px] flex items-center mr-1 justify-center -translate-y-1/2">
                  {value.length}
                </div>
              )}
              {isLoading ? (
                <div className="flex items-center justify-center h-10">
                  <div className="w-5 h-5 border-b-2 mr-2 border-gray-900 dark:border-white rounded-full animate-spin" />
                </div>
              ) : (
                isMulti && value && value.length > 0 && <XCircle id={`${name}-filter-all-clear`} className="h-5 w-5 text-gray-400" aria-hidden="true" onClick={() => onChange(name, isMulti ? [] : null)} />
              )}
            </ComboboxButton>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => onSearch && onSearch("")}
          >
            <ComboboxOptions className="absolute w-full top-10 rounded-md bg-white text-base shadow-lg ring-1 pb-3 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 space-y-1">
              <div className="relative w-full">
                <div className="w-full flex items-center justify-end px-4 py-2 border-b">
                  <button id={`${name}-filter-dropdown-expand-all`} type="button" className="sticky -top-4 ml-3 py-1 text-xs text-blue-500 z-50 bg-white px-4" onClick={expandAll}>
                    {isExpanded ? "Collapse all" : "Expand all"}
                  </button>
                </div>
                <div className="pt-2">
                  <div className="h-[300px] overflow-auto px-3">
                    {options && options.length ? (
                      generateTreeView(options, 0)
                    ) : (
                      <div className="h-28 opacity-100 text-center flex justify-center">
                        <p className="text-xl my-auto">No Data Found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
