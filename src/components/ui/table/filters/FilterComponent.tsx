import { FilterComponentProps } from "@/lib/types/table";
import { format, parse } from "date-fns";
import DateTimePicker from "../../fields/DateTimePicker";
import FilterSelect from "./FilterSelect";
import FilterTextInput from "./FilterTextInput";

export default function FilterComponent(props: FilterComponentProps) {
  const { filterSet, filters, clearFilter, handleFilters } = props;
  console.log('====================================');
  console.log(filters,"hey this is filters");
  console.log('====================================');
  function filterFields(item: any) {
    const { type, name } = item;
    switch (type) {
      case "select":
      case "radio":
        return (
          <FilterSelect
            {...item}
            type={type}
            clearFilter={clearFilter}
            value={filters && filters[name]}
            handleFilters={handleFilters}
          />
        );
      case "text":
      case "number":
        return (
          <FilterTextInput
            {...item}
            type={type}
            clearFilter={clearFilter}
            value={filters && filters[name]}
            handleFilters={handleFilters}
          />
        );
      case 'date':
        return (
          <DateTimePicker
            onChange={(dateValue:any) => handleFilters(name, format(dateValue, 'yyyy-MM-dd'))}
            value={filters && filters[name] && parse(filters[name], 'yyyy-MM-dd', new Date())}
            clearFilter={clearFilter}
            name={name}
            {...item}
          />
        );
      case "customComponent":
        return item.customComponent;
      default:
        return null;
    }
  }
    // return filterSet.map((item: any) => item && filterFields(item));
    return filterSet.map((item: any, index: number) =>
      item && (
        <div key={item.id || `${item.name}-${index}`}>
          {filterFields(item)}
        </div>
      )
    );
}
