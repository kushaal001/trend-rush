import { GenericTableProps } from '@/lib/types/table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowUpAz, ArrowUpDown, ArrowUpZA } from 'lucide-react';
import { GenericLoader } from '../fields/GenericLoader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { getStatus } from '../columns-helper';

export default function GenericTable({
  data,
  tableColumns,
  isLoading = false,
  isScrollable,
  handleTableSorting = () => { },
  filters = {},
  tableName = "",
  isRowSelect
}: GenericTableProps) {
  const columnHelper = createColumnHelper<any>();

  const columns = tableColumns.map(
    (eachItem: any, index: any) => {
      if (index === 0 && isRowSelect) {
        return eachItem &&
          columnHelper.accessor(eachItem.dataIndex, {
            ...eachItem,
            header: ({ table }) => eachItem.header(table),
            cell: ({ row, renderValue }: any) => {
              const cellValue = renderValue();
              return eachItem.cellRender
                ? eachItem.cellRender(cellValue, row.original, row.index, row)
                : cellValue || <span className="text-gray-500">-</span>;
            },
          })

      }
      return eachItem &&
        columnHelper.accessor(eachItem.dataIndex, {
          ...eachItem,
          header: eachItem.header,
          cell: ({ row, renderValue }: any) => {
            const cellValue = renderValue();
            if (eachItem.dataIndex.toLowerCase() === 'status') {
              const { status, color } = getStatus(cellValue);

              return (
                <span
                  style={{
                    boxShadow: `
                    inset 0px -0.6px 0px 0px rgba(0, 0, 0, 0.25),
                    inset 0.5px 0px 0px 0px rgba(255, 255, 255, 0.20),
                    inset -0.5px 0px 0px 0px rgba(255, 255, 255, 0.20),
                    inset 0px 0.5px 0px 0px rgba(255, 255, 255, 0.48)
                  `
                  }}
                  role="button"
                  onClick={() => {
                    if (eachItem.customFunction) {
                      eachItem.customFunction(row, renderValue);
                    }
                  }}
                  className={`px-2 py-1 status rounded-[10px] text-[10px] inline-block min-w-max ${color}`}
                >
                {status === 'Unknown' ? row.original.status_display_name : status ? status : row.original.status_display_name}
                </span>
              );
            }
            return eachItem.cellRender
              ? eachItem.cellRender(cellValue, row.original, row.index)
              : cellValue || <span className="text-gray-500">-</span>;
          },
        })
    }
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  if (isLoading) {
    return <GenericLoader />;
  }

  const renderTableBody = () => {
    const rows = table.getRowModel().rows;
    if (rows.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableColumns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      );
    }

    return rows.map((row: any, index: any) => (
      <TableRow
        key={row.id}
        className={` divide-x-[1px] ${index % 2 === 0 ? '' : 'bg-[var(--primary_color)]/3 '}`}
        data-state={row.getIsSelected() && 'selected'}
      >
        {row.getVisibleCells().map((cell: any) => (
          <TableCell
            className="px-5 py-1.5  border-l break-before-avoid text-[13px]"
            key={cell.id}
            style={{
              width:
                cell.column.getSize() === Number.MAX_SAFE_INTEGER
                  ? 'auto'
                  : cell.column.getSize(),
            }}

          // colSpan={cell.column.getSize()}
          // width={cell.column.columnDef.width || '100%'}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const renderSortingIcons = (keyName: string, sortableName: string) => {
    const currentItem = filters && filters[keyName];
    return (
      <>
        {currentItem === sortableName && (
          <button
            type="button"
            onClick={() => handleTableSorting!(keyName, `-${sortableName}`)}
          >
            <ArrowUpAz className="h-4 w-4 text-black" />
          </button>
        )}
        {currentItem === `-${sortableName}` && (
          <button
            type="button"
            onClick={() => handleTableSorting!(keyName, '')}
          >
            <ArrowUpZA className="h-4 w-4 text-black" />
          </button>
        )}
        {currentItem !== sortableName && currentItem !== `-${sortableName}` && (
          <button
            type="button"
            onClick={() => handleTableSorting!(keyName, sortableName)}
          >
            <ArrowUpDown className="h-4 w-4 text-black" />
          </button>
        )}
      </>
    );
  };

  return (
    <div className=" text-[14px]">
      <Table
        className={clsx(
          ' border-none text-primary-text',
          isScrollable ? 'min-w-max w-screen overflow-x-scroll' : ''
        )}
        id={tableName}
      >
        <TableHeader className="bg-[var(--primary_color)]/[8%] border-none ">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow className=' divide-x-[1px] ' key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableHead
                  className=" px-5 text-[14px] break-before-column font-semibold text-primary-text text-opacity-[75%] "
                  key={header.id}
                  style={{
                    width:
                      header.getSize() === Number.MAX_SAFE_INTEGER
                        ? 'auto'
                        : header.getSize(),
                  }}
                >
                  <div className="flex">
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    {header.column &&
                      header.column.columnDef &&
                      header.column.columnDef.sortable && (
                        <div className="flex items-center ml-4">
                          {renderSortingIcons(
                            header.column.columnDef.orderingKey || 'ordering',
                            header.column.columnDef.sortableName ||
                            header.column.columnDef.dataIndex
                          )}
                        </div>
                      )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=' border-none'>{renderTableBody()}</TableBody>
      </Table>
    </div>
  );
}
