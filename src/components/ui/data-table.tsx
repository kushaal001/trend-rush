"use client"

import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Loader2, ArrowUpDown, ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExtendedColumnDef } from "@/lib/types/generics"

export function DataTable<T>({
  tableData,
  tableColumns,
  showHeader,
  isLoading,
  isScrollable = false,
  pinnedColumnId = null,
  needButtonsInTableRow = false,
}: {
  tableData: T[],
  tableColumns: ExtendedColumnDef<T>[],
  showHeader: boolean,
  isLoading: boolean,
  isScrollable?: boolean,
  pinnedColumnId?: string | null,
  needButtonsInTableRow?: boolean
}) {
  const processedColumns = useMemo(() => {
    return tableColumns.map(column => {
      // Add sorting capability to columns marked as sortable
      const processedColumn = {
        ...column,
        enableSorting: (column as ExtendedColumnDef<T>).allowSorting || false,
      };

      // Add pinning capability if pinnedColumnId matches this column's key
      if (pinnedColumnId && 'accessorKey' in column && column.accessorKey === pinnedColumnId) {
        return {
          ...processedColumn,
          enablePinning: true,
          pin: 'left'
        };
      }

      return processedColumn;
    });
  }, [tableColumns, pinnedColumnId]);

  const initialSorting: SortingState = useMemo(() => {
    const defaultSortColumn = tableColumns.find(col =>
      (col as ExtendedColumnDef<T>).allowSorting &&
      (col as ExtendedColumnDef<T>).defaultSort
    );

    if (defaultSortColumn && 'accessorKey' in defaultSortColumn) {
      return [
        {
          id: defaultSortColumn.accessorKey as string,
          desc: (defaultSortColumn as ExtendedColumnDef<T>).defaultSort === 'desc'
        }
      ];
    }
    return [];
  }, [tableColumns]);

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: tableData,
    columns: processedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    defaultColumn: {
      // Important: Set reasonable minimums to prevent columns from collapsing
      minSize: 80,
      size: 150,
    },
    enableSortingRemoval: false,
    enableColumnPinning: !!pinnedColumnId,
  });

  function renderContent() {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell
            colSpan={tableColumns.length}
            className="h-24 text-center"
          >
            <div className="mx-auto flex h-48 w-full items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-800" />
            </div>
          </TableCell>
        </TableRow>
      )
    }
    if (table.getRowModel().rows?.length) {
      return (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className={cn(needButtonsInTableRow ? "h-10 min-h-10" : "h-6 min-h-6")}
          >
            {row.getVisibleCells().map((cell) => {
              const isPinned = pinnedColumnId && cell.column.id === pinnedColumnId;
              const columnDef = cell.column.columnDef as ExtendedColumnDef<T>;

              const shouldWrap = columnDef.allowTextWrap === true;
              const shouldTruncate = columnDef.truncateText === true;

              return (
                <TableCell
                  key={cell.id}
                  style={{
                    width: `${cell.column.getSize()}px`,
                    minWidth: `${cell.column.columnDef.minSize || 80}px`,
                    maxWidth: columnDef.maxWidth ? `${columnDef.maxWidth}px` : undefined,
                  }}
                  className={cn(
                    isPinned && "sticky left-0 z-10 bg-white shadow-sm",
                    shouldWrap ? "whitespace-normal" : "whitespace-nowrap",
                    shouldTruncate && "truncate",
                  )}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      )
    }
    return (
      <TableRow>
        <TableCell
          colSpan={tableColumns.length}
          className="h-24 text-center"
        >
          No results.
        </TableCell>
      </TableRow>
    )
  }

  // Calculate total table width based on column sizes
  const totalTableWidth = tableColumns.reduce((total, column) => {
    return total + (column.size || 150);
  }, 0);

  return (
    <div className="w-full">
      {/* Explicitly make the table container scrollable with the right minimum width */}
      <div className={cn(
        "",
        isScrollable && "overflow-x-auto"
      )}>
        <div style={{ minWidth: isScrollable ? `${totalTableWidth}px` : '100%' }}>
          <Table>
            <TableHeader className={cn(showHeader ? 'bg-[#3147EC0D] font-medium' : 'hidden')}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className={cn(needButtonsInTableRow ? "h-10" : "h-6")}>
                  {headerGroup.headers.map((header) => {
                    const column = header.column;
                    const columnDef = column.columnDef as ExtendedColumnDef<T>;
                    const canSort = columnDef.allowSorting === true && column.getCanSort();
                    const isPinned = pinnedColumnId && header.column.id === pinnedColumnId;

                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          width: `${header.getSize()}px`,
                          minWidth: `${header.column.columnDef.minSize || 80}px`,
                          maxWidth: columnDef.maxWidth ? `${columnDef.maxWidth}px` : undefined,
                        }}
                        className={cn(
                          isPinned && "sticky left-0 z-20 bg-[#3147EC0D] shadow-sm",
                          needButtonsInTableRow ? "h-10" : "h-6",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </div>

                          {canSort && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2 p-0 h-8 w-8"
                              onClick={(e) => {
                                e.preventDefault();
                                column.toggleSorting();
                              }}
                            >
                              {column.getIsSorted() === "asc" ? (
                                <ArrowUpNarrowWide className="h-4 w-4" />
                              ) : column.getIsSorted() === "desc" ? (
                                <ArrowDownWideNarrow className="h-4 w-4" />
                              ) : (
                                <ArrowUpDown className="h-4 w-4 opacity-50" />
                              )}
                              <span className="sr-only">Sort</span>
                            </Button>
                          )}
                        </div>
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {renderContent()}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
