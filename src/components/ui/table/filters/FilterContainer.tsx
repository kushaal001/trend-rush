import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FilterContainerProps } from "@/lib/types/table";

export function FilterContainer(props: FilterContainerProps) {
  const {
    children,
    applyFilters,
    resetFilters,
    isInstituion = false,
    isFilterApplyDisabled,
    filters,
  } = props;

  return (
    <Card
      className={cn(
        "w-full space-y-1 border-none rounded-md  border-gray-400 shadow-none"
      )}
    >
      <div className="scroll-margin-my-4 overscroll-none flex flex-wrap gap-4 items-center">
        <CardContent className=" p-0 w-[max-content]">{children}</CardContent>
        <div className="flex justify-end gap-3 ml-auto">
          <button
            style={{
              boxShadow: `
              inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
              inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
            `
            }}
            type="button"
            onClick={resetFilters}
            className="flex min-w-[max-content] items-center rounded-[10px] bg-red-100 px-4 py-1.5 text-xs text-red-700 hover:bg-red-200 transition-all"
          >
            Reset
          </button>
          <button
            style={{
              boxShadow: `
              inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
              inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
            `
            }}
            type="button"
            onClick={applyFilters}
            disabled={isFilterApplyDisabled}
            className={cn('flex min-w-[max-content] items-center rounded-[10px]  px-4 py-1.5 text-xs font-semibold transition-all',
              isFilterApplyDisabled
                ? "bg-green-200 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            )}
          >
            Apply
          </button>
        </div>
      </div>
    </Card>
  );
}
