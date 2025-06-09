import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import Select, {
  ActionMeta,
  InputActionMeta,
  MultiValue,
  SingleValue,
} from "react-select";

interface CustomSelectProps<T> {
  autoFocus?: boolean;
  name: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  value?: T | T[] | null;
  getData?: (inputValue: string) => void;
  onChange: (
    newValue: MultiValue<T> | SingleValue<T>,
    actionMeta: ActionMeta<T>,
  ) => void;
  instanceId?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  className?: string;
  isMulti?: boolean;
  menuPlacement?: "bottom" | "top" | "auto";
  placeholder?: string;
}

export default function CustomSelect<T>({
  autoFocus,
  name,
  options,
  getOptionLabel,
  getOptionValue,
  value,
  getData,
  onChange,
  instanceId,
  isLoading = false,
  isClearable = true,
  disabled = false,
  className = "",
  isMulti = false,
  menuPlacement = "bottom",
  placeholder = "Select...",
  ...props
}: CustomSelectProps<T>) {
  const [active, setActive] = useState(false);
  const inputClassNames = cn(
    `react-select-${name}`,
    "rounded-md border border-input border-black/10",
    className,
  );

  const onInputChange = (
    inputValue: string,
    { action, prevInputValue }: InputActionMeta,
  ) => {
    switch (action) {
      case "set-value":
        return prevInputValue;
      case "input-change":
        if (getData) {
          if (inputValue) {
            getData(inputValue);
          }
        }
        return inputValue;
      case "menu-close":
        return inputValue;
      default:
        return inputValue;
    }
  };

  return (
    <Fragment>
      <Select
        {...props}
        id={name}
        autoFocus={autoFocus}
        value={value != undefined ? value : null}
        isLoading={isLoading}
        isClearable={isClearable}
        backspaceRemovesValue={false}
        options={options}
        onFocus={() => setActive(true)}
        onChange={(newValue, actionMeta) => onChange(newValue, actionMeta)}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        className={inputClassNames}
        isDisabled={disabled}
        placeholder={placeholder}
        onInputChange={onInputChange}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        instanceId={instanceId || name}
        menuPlacement={menuPlacement}
        menuPortalTarget={typeof document !== "undefined" ? document.querySelector("body") : null}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 50 }),
          control: (base) => ({
            ...base,
            color: "primary25",
            background: "transparent",
            padding: active ? "0px 2px" : "0px 2px",
            border: 0,
            // This line disable the blue border
            boxShadow: "none",
            width: "100%",
            position: "relative",
            fontSize: "14px",
          }),
          container: (base) => ({
            ...base,
            width: "100%",
            position: "relative",
          }),
          option: (styles) => ({
            ...styles,
            fontSize: "14px",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 50,
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
    </Fragment>
  );
}
