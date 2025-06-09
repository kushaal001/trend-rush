import { cn } from "@/lib/utils";
import { DropdownValueTypes, FilterSelectProps } from "@/lib/types/table";
import { X } from "lucide-react";
import { useState } from "react";
import Select, { components } from "react-select";

export default function FilterSelect(props: FilterSelectProps) {
  const {
    onSearch,
    handleFilters,
    clearFilter,
    autoFocus,
    name,
    label,
    required,
    isMulti,
    isLoading,
    disabled,
    options,
    getOptionLabel,
    getOptionValue,
    className,
    value,
    innerRef,
    defaultMenuIsOpen,
    onChange,
    instanceId,
  } = props;

  const [isSearchActive, setIsSearchActive] = useState(false);
  const getSelectOptionLabel = (option: any) => option.name || option.label || option.username || option.code;
  const getSelectOptionValue = (option: any) => option.id || option.value;

  const onInputChange = (inputValue: any, { action, prevInputValue }: any) => {
    switch (action) {
      case "set-value":
        return prevInputValue;
      case "input-change":
        setIsSearchActive(!!inputValue);
        if (onSearch) {
          onSearch(inputValue || "");
        }
        return inputValue;
      case "menu-close":
        setIsSearchActive(false);
        if (onSearch && prevInputValue) {
          onSearch("");
        }
        return inputValue;
      default:
        return inputValue;
    }
  };

  const onChangeFilter = (newValues: any, actionMeta: any) => {
    const { action } = actionMeta;
    if (action === "clear") {
      clearFilter(name);
    } else {
      handleFilters(name, newValues);
    }
  };

  const isDropdownValue = (value: any): value is DropdownValueTypes[] => {
    return (
      Array.isArray(value) &&
      value.every(
        (item) => typeof item.id === "string" && typeof item.name === "string"
      )
    );
  };

  const itemDelete = (item: { id: string }) => {
    if (
      (value as DropdownValueTypes[]) &&
      Array.isArray(value) &&
      isDropdownValue(value)
    ) {
      const newItems = value.filter((vItem) =>
        getOptionValue
          ? getOptionValue(vItem) !== getOptionValue(item)
          : getSelectOptionValue(vItem) !== getSelectOptionValue(item)
      );
      handleFilters(name, newItems);
    }
  };
  const clsNames = cn(
    " text-sm border rounded-[10px] placeholder:text-black  ",
    value ? "border-2 border-gray-600 text-gray-600" : "border-[#d1d5db]",
    className
  );

  const MenuList = (props: any) => {
    return (
      <components.MenuList {...props}>
        {isMulti &&
          (value as DropdownValueTypes[]) &&
          Array.isArray(value) &&
          value.length > 0 && (
            <div className="mt-0.5 flex w-full flex-wrap">
              {value.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="m-1 flex items-center gap-x-1 rounded-md border bg-[#f3f4f6] px-2 py-0.5 text-start text-[10px]  font-medium text-black shadow-sm"
                >
                  <p
                    className="w-10 overflow-hidden truncate text-ellipsis"
                    title={
                      getOptionLabel
                        ? getOptionLabel(item)
                        : getSelectOptionLabel(item)
                    }
                  >
                    {getOptionLabel
                      ? getOptionLabel(item)
                      : getSelectOptionLabel(item)}
                  </p>
                  <div>
                    {required &&
                      value &&
                      Array.isArray(value) &&
                      value.length === 1 ? null : (
                      <button
                        type="button"
                        className="mt-1"
                        onClick={() => itemDelete(item)}
                        id={`${name}-selected-item-${index}-button`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        {props.children}
      </components.MenuList>
    );
  };

  return (
    <div className="filter-select w-full ">
      {/* {label && (
        <label htmlFor={name} className={cn("text-[14px] text-xs text-[#475569]")}>
          {label}
        </label>
      )} */}
      <Select
        {...props}
        components={{ MenuList }}
        id={name}
        autoFocus={autoFocus}
        defaultMenuIsOpen={defaultMenuIsOpen}
        ref={innerRef}
        value={value}
        isMulti={isMulti}
        isLoading={isLoading}
        isClearable={true}
        backspaceRemovesValue={false}
        options={options}
        onChange={onChange || onChangeFilter}
        getOptionLabel={getOptionLabel || getSelectOptionLabel}
        getOptionValue={getOptionValue || getSelectOptionValue}
        className={clsNames}
        closeMenuOnSelect={!isMulti}
        isDisabled={disabled}
        placeholder={`Select ${label}`}
        onInputChange={onInputChange}
        instanceId={instanceId || name}
        // menuPortalTarget={typeof document !== undefined ? document.body : null}
        styles={{
          menu: (base) => ({
            ...base,
            width: "100%",
            maxWidth: "100%",
            borderRadius: "6px",
            padding: "5px",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 99 }),
          control: (base) => ({
            ...base,
            color: "primary25",
            background: "transparent",
            padding: "0px 2px",
            border: 0,
            boxShadow: "none",
            width: "100%",
            position: "relative",
          }),
          container: (base) => ({
            ...base,
            width: "100%",
            position: "relative",
          }),
          valueContainer: (base) => ({
            ...base,
          }),
          option: (styles, state) => ({
            ...styles,
            width: "100%",
            fontSize: "14px",
            borderRadius: "4px",
            backgroundColor: state.isSelected ? "#3b82f6" : "",
            "&:hover": {
              backgroundColor: "#3b82f6",
              color: "white",
            },
          }),
          multiValue: (base) => ({
            ...base,
            display: isMulti ? "none" : "",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            neutral80: "primary25",
          },
        })}
      />
      {isMulti &&
        value &&
        (value as DropdownValueTypes[]) &&
        Array.isArray(value) &&
        value.length > 0 && (
          <div className="pointer-events-none absolute right-6 top-[50%] flex h-[20px] w-[20px] -translate-y-1/2 items-center justify-center rounded-full bg-[#eaeaea] text-[10px] opacity-80">
            {value.length}
          </div>
        )}
    </div>
  );
}
