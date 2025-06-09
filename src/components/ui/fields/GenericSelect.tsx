import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { GenericSelectProps } from "@/lib/types/generics";
import { FieldValues } from "react-hook-form";
import Select from "react-select";

export default function GenericSelect<T extends FieldValues>(
  props: GenericSelectProps<T>
) {
  const {
    label,
    name,
    options = [],
    isSearchable = true,
    placeholder,
    getOptionLabel,
    getData,
    getOptionValue,
    required = false,
    isLoading = false,
    isMulti,
    onChange,
    form,
    disabled,
    id,
  } = props;

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "10px",
      zIndex: 1,
      borderColor: state.isFocused ? "#d1d5db" : "#d1d5db",
      backgroundColor: "white",
      "&:hover": {
        borderColor: "black",
        color: "white",
      },
      //   boxShadow: state.menuIsOpen ? "0 0 0 1px black" : ` 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      // 0 1px 2px -1px rgba(0, 0, 0, 0.1)`,
    }),
    option: (provided: any) => ({
      ...provided,
      display: "flex",
      overflow: "hidden",
      whiteSpace: "nowrap",
      color: "black",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#0780d8",
        color: "white",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      maxWidth: "100%",
      overflow: "auto",
      zIndex: 99999,
      height: "250px",
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 99999 }),
  };

  const onInputChange = (inputValue: any, { action, prevInputValue }: any) => {
    switch (action) {
      case "set-value":
        return prevInputValue;
      case "input-change":
        if (getData) {
          if (inputValue) {
            getData(inputValue);
          } else {
            getData("");
          }
        }
        return inputValue;
      case "menu-close":
        if (getData && prevInputValue) {
          getData("");
        }
        return inputValue;
      default:
        return inputValue;
    }
  };

  const getLabel = (options: any) =>
    getOptionLabel
      ? getOptionLabel(options)
      : options.label || options.name || options.code;
  const getValue = (options: any) =>
    getOptionValue ? getOptionValue(options) : options.value || options.id;

  return (
    <div className="flex flex-col justify-start text-sm  relative">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className=" space-y-[6px]">
            <FormLabel
              htmlFor={name}
              className={cn(
                required
                  ? "after:text-red-600 after:content-['*']"
                  : " text-primary_text_color",
                "capitalize pb-2 z-[1] text-primary_text_color"
              )}
            >
              {label}
            </FormLabel>
            <FormControl className="z-50">
              <Select
                className=" rounded-[10px] "
                id={name}
                isLoading={isLoading}
                value={form.getValues(name)}
                name={name}
                isMulti={isMulti}
                options={options}
                onChange={(newValues: any, actionMeta) => {
                  const { action } = actionMeta;
                  form.clearErrors(name);

                  if (action === "select-option" || action === "remove-value") {
                    form.setValue(name, newValues);
                  } else if (action === "clear") {
                    form.setValue(
                      name,
                      isMulti ? ([] as T[]) : (undefined as any)
                    );
                  }

                  if (onChange) {
                    onChange(newValues, actionMeta);
                  }
                }}
                styles={customStyles}
                isSearchable={isSearchable}
                isDisabled={disabled}
                isClearable
                // required={required}
                instanceId={id || name}
                placeholder={placeholder}
                getOptionLabel={getLabel}
                getOptionValue={getValue}
                menuPortalTarget={
                  typeof document !== "undefined"
                    ? document.querySelector("body")
                    : null
                }
                menuPosition="fixed"
                menuShouldBlockScroll={false}
                onInputChange={onInputChange}
                closeMenuOnSelect={!isMulti}
              />
            </FormControl>
            <FormMessage id={`${name}-errors-message`} />
          </FormItem>
        )}
      />
    </div>
  );
}
