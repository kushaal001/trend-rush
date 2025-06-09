import { cn } from '@/lib/utils';

export default function GenericListView(props: any) {
  const { selectedRow, cols } = props;

  const renderRow = (label: any, value: any, colSpan: number) => (
    <div
      key={label}
      className={cn(
        `col-span-${colSpan || 1} flex w-full  overflow-hidden`
      )}
    >
      <div className="px-4 min-w-[230px] capitalize py-2 whitespace-wrap text-sm font-semibold text-gray-900">
        {label}
      </div>
      <div className="px-4 w-full py-2 bg-[var(--primary_color)]/5 border-l break-words text-sm text-gray-700">
        {value !== undefined ? value : 'N/A'}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1  rounded-[10px] overflow-hidden divide-x divide-y border mb-4  ",
        cols,
      )}
    >
      {selectedRow && Array.isArray(selectedRow) ? (
        selectedRow.length > 0 ? (
          selectedRow.map(({ key: label, value, colSpan }) =>
            renderRow(label, value, colSpan)
          )
        ) : (
          <p>No data available</p>
        )
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
