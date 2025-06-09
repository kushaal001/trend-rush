'use client';

import { cn } from '@/lib/utils';
import {
  ArrowLeftCircleIcon,
  CirclePlusIcon,
  Eye,
  Funnel,
  ImportIcon,
  Loader2,
  LogOut,
  Search,
  Upload,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import Breadcrumbs from "../Breadcrumbs";
import { handleErrors, statusError } from '@/components/common/errors';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import exportToExcel from '@/components/ui/table/GenericExportToExcel';
import DeleteModal from '../modals/DeleteModal';
import GenericPagination from './GenericPagination';
import GenericTable from './GenericTable';
import FilterComponent from './filters/FilterComponent';
import { FilterContainer } from './filters/FilterContainer';
import { RenderDeleteButton, RenderEditButton } from './tableComponents';
import { parseObjToQuery } from '@/lib/helpers';
import { toast } from 'sonner';
import { Button } from '../button';

export default function GenericTableLayout({
  cypreessId,
  tableData,
  columns,
  isLoading,
  query = {},
  actionColumn,
  pageConfig = { title: '', name: '', ignoreQueries: [] },
  count,
  showHeaderButtons = true,
  renderHeaderButtons,
  externalLinks,
  getTableData,
  searchName,
  registerAPIFilters,
  filters,
  deleteButtonName,
  deleteMessage,
  setFilters,
  filterSet,
  setShowFilters,
  onResetFilterFallback,
  deleteAPIService,
  isServerSidePagination,
  showFilters,
  isScrollable = false,
  fallBackURL,
  exportService,
  importService,
  showImport,
  showExport,
  breadcrumbs,
  isFilterApplyDisabled,
  tableName = '',
  fileName = 'Excel',
  excludeExportColumns = [],
  isRowSelect = false,
  reportsExport,
}: any) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteRecordId, setDeleteRecordId] = useState<any>(null);
  const [currentDeleteRow, setCurrentDeleteRow] = useState<any>(null);
  const [searchInputValue, setSearchInputValue] = useState<string>(
    query[searchName || 'search'] || ''
  );
  const [rowSelection, setRowSelection] = useState<number[]>([]);
  const pathName = usePathname();
  const router = useRouter();
  const [searchBoolean, setSearchBoolean] = useState(true);
  const [exportLoader, setExportLoader] = useState(false);
  const [importLoader, setImportLoader] = useState(false);
  const [filter, setFilter] = useState<any>(false)

  useEffect(() => {
    setRowSelection([]);
    if (searchBoolean) {
      return setSearchBoolean(false);
    }
    const timer = setTimeout(() => {
      const newQuery: any = { ...query };

      Object.keys(newQuery).forEach((item) => {
        if (!newQuery[item]) {
          delete newQuery[item];
        }
        if (registerAPIFilters && registerAPIFilters.length > 0) {
          if (!registerAPIFilters.includes(item)) {
            delete newQuery[item];
          }
        }
      });
      if (searchName) {
        if (searchInputValue) {
          newQuery[searchName] = searchInputValue;
        } else {
          delete newQuery[searchName];
        }
      }
      delete newQuery.page;
      router.push(`${pathName}/${parseObjToQuery(newQuery)}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInputValue]);

  const getRowName = () => {
    if (deleteRecordId) {
      const deleteName = columns && columns.length > 0 && columns[0].dataIndex;
      if (currentDeleteRow && currentDeleteRow[deleteName]) {
        return currentDeleteRow[deleteName];
      } else return '';
    } else return '';
  };

  function applyFilter() {
    const newQuery = { ...query };
    Object.keys(filters).forEach((item) => {
      const value = filters[item];
      if (value) {
        if (Array.isArray(value)) {
          if (value.length) {
            newQuery[item] = value
              .map((selectedKeyItem: any) => selectedKeyItem.id)
              .join(',');
          } else {
            delete newQuery[item];
          }
        } else if (typeof value === 'object') {
          newQuery[item] = value.id;
        } else if (typeof value === 'string') {
          newQuery[item] = value;
        }
        if ('page' in newQuery) {
          delete newQuery.page;
        }
      } else {
        delete newQuery[item];
      }
      if (!(item in filters)) {
        delete newQuery[item];
      }
    });
    router.push(`${pathName}/${parseObjToQuery(newQuery)}`);
  }

  function clearFilter(filterName: string) {
    setFilters!((prevState: any) => {
      const newState = { ...prevState };
      if (newState[filterName]) {
        newState[filterName] = null;
      }
      return newState;
    });
  }

  function clearFilters() {
    const newQuery = { ...query };

    // Clear the query filters based on the registered API filters
    if (registerAPIFilters) {
      registerAPIFilters.forEach((dataIndex: string) => {
        if (
          dataIndex !== 'search' &&
          dataIndex !== searchName &&
          !pageConfig.ignoreQueries?.includes(dataIndex)
        ) {
          //to preserve tab query in the url and keep user on the same page
          delete newQuery[dataIndex];
        }
      });
    }

    const newItems: any = {};

    // Initialize new items to null based on the registered filters
    registerAPIFilters.forEach((item: string) => {
      if (
        item !== 'search' &&
        item !== searchName &&
        !pageConfig.ignoreQueries?.includes(item)
      ) {
        //to preserve tab query in the url and keep user on the same page
        newItems[item] = null;
      }
    });

    setFilters(newItems);

    // Call fallback function if provided
    if (onResetFilterFallback) {
      onResetFilterFallback();
    }

    // Update the router with the new query
    router.push(`${pathName}/${parseObjToQuery(newQuery)}`);
  }

  async function downloadFile() {
    setExportLoader(true);
    const { data, errors } = await exportService();
    if (errors) {
      setExportLoader(false);
    } else {
      // toast.success('Successfully Saved!')
      setExportLoader(false);
    }
  }

  async function importFile(file: any) {
    setImportLoader(true);
    const formData = new FormData();
    formData.append('file', file);
    const { data, errors, status } = await importService(formData);
    if (data) {
      const {
        data: { skipped_rows },
      } = data;
      if (skipped_rows && skipped_rows.length > 0) {
        toast.error(`Skipped rows: ${skipped_rows.join(', ')}`, {

        });
      } else {
        toast.success('Successfully Imported!', {});
      }
      getTableData();
    } else if (errors && typeof errors === 'object') {
      handleErrors(errors);
    } else if (status) {
      statusError(status);
    } else {
      console.error('Unexpected errors format:', errors);
    }
    setImportLoader(false);
  }

  useEffect(() => {
    const isFiltersApplied = Object.keys(query).some((element: any) => {
      return element !== "search" && registerAPIFilters.includes(element)
    });
    if (isFiltersApplied) {
      setFilter(true)
    } else {
      setFilter(false)
    }
  }, [])

  const tableColumns = actionColumn
    ? [
      ...columns,
      actionColumn && {
        header: (
          <div className="flex justify-end w-full">{actionColumn.title}</div>
        ),
        dataIndex: actionColumn.dataIndex,
        width: actionColumn.width,
        key: actionColumn.key,
        size: actionColumn.size,
        cellRender: (id: number, record: any, index: number) => (
          <div className="flex h-full w-full items-center justify-end gap-2">
            {actionColumn &&
              actionColumn.renderButtons &&
              actionColumn.renderButtons(id, record, index)}
            {actionColumn.showView &&
              typeof actionColumn.showView === 'function' &&
              actionColumn.showView && (
                <Eye
                  onClick={() => actionColumn.showView(id, record, index)}
                  className="w-5 h-5 cursor-pointer"
                />
              )}
            {actionColumn.showEdit &&
              typeof actionColumn.showEdit === 'boolean' && (
                <RenderEditButton
                  id={`${cypreessId}-edit-button`}
                  href={externalLinks!.edit(id)}
                />
              )}
            {actionColumn.showEdit &&
              typeof actionColumn.showEdit === 'function' &&
              actionColumn.showEdit(id, record, index) && (
                <RenderEditButton
                  id={`${cypreessId}-edit-button`}
                  href={externalLinks!.edit(id)}
                />
              )}
            {actionColumn.showDelete &&
              typeof actionColumn.showDelete === 'boolean' && (
                <RenderDeleteButton
                  onClick={() => {
                    setShowDeleteModal(true);
                    setDeleteRecordId(id);
                    setCurrentDeleteRow({
                      id: record.id,
                      name: record.name || '',
                    });
                  }}
                  id={`${cypreessId}-delete-button`}
                />
              )}
            {actionColumn.showDelete &&
              typeof actionColumn.showDelete === 'function' &&
              actionColumn.showDelete(id, record, index) && (
                <RenderDeleteButton
                  onClick={() => {
                    setShowDeleteModal(true);
                    setDeleteRecordId(id);
                    setCurrentDeleteRow({
                      ...record,
                      name: record.name || '',
                    });
                  }}
                  id={`${cypreessId}-edit-button`}
                />
              )}
          </div>
        ),
      },
    ]
    : [...columns];

  function validatePagination(deleteIds: number[]) {
    if ('page' in query && Math.ceil(count / 20) === Number(query.page)) {
      if (deleteIds.length === tableData.length) {
        router.push(
          `${pathName}/${parseObjToQuery({
            ...query,
            page: Number(query.page) - 1,
          })}`
        );
      } else {
        getTableData();
      }
    } else {
      getTableData();
    }
  }

  function handleFilters(dataIndex: string, value: any) {
    setRowSelection([]);
    if (dataIndex) {
      setFilters!((prevState: any) => {
        if (value && Array.isArray(value)) {
          if (value.length) {
            return {
              ...prevState,
              [dataIndex]: value,
            };
          }
          delete prevState[dataIndex];
          return prevState;
        }
        return {
          ...prevState,
          [dataIndex]: value,
        };
      });
    }
  }

  const handleTableSorting = (dataIndex: string, value: any) => {
    const newQuery: any = { ...query };
    const newData = {
      ...filters,
      [dataIndex]: value,
    };
    if (newData[dataIndex] === '') {
      delete newQuery[dataIndex];
    } else {
      newQuery[dataIndex] = newData[dataIndex];
    }
    delete newQuery.page;
    router.push(`${pathName}/${parseObjToQuery(newQuery)}`);
    setFilters(newData);
  };

  function renderHeaderSectionButtons() {
    return (
      <div className="ml-auto flex items-center gap-3 ">
        {renderHeaderButtons && renderHeaderButtons()}
        {searchName && (
          <div className="relative w-full">
            <Search className="text-border-color z-4 pointer-events-none absolute left-[0.6rem] top-[50%] -translate-y-1/2 size-[15px] dark:text-blue-200 text-gray-400" />
            <input
              id={`${cypreessId}-search`}
              className="w-full rounded-[10px] border  px-8 py-1.5 outline-none duration-300 placeholder:text-sm placeholder:font-light focus:outline focus:outline-offset-2 focus:outline-blue-500 dark:border dark:bg-[transparent] dark:text-white"
              type="text"
              placeholder="Search"
              name="searchInputValue"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            {searchInputValue && (
              <button
                type="button"
                id={`${cypreessId}-search-cancel`}
                className="text-border-color absolute right-[0.6rem] top-[10px] dark:text-blue-200"
                onClick={() => setSearchInputValue('')}
              >
                <XCircle className="size-[15px] text-gray-500" />
              </button>
            )}
          </div>
        )}
        {showImport && (
          <label
            htmlFor="import"
            className={cn(
              importLoader ? 'cursor-not-allowed' : '',
              'rounded-lg p-2 text-xs flex flex-row items-center px-2  transition-all ease-in-out duration-150 bg-primary hover:bg-[#0656bf] cursor-pointer text-white '
            )}
          >
            {importLoader ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2 " />
            ) : (
              <ImportIcon className="h-4 w-4 mr-2" />
            )}
            Import
          </label>
        )}
        {showExport && (
          <button
            id="filter-button"
            onClick={() =>
              exportToExcel(tableName, fileName, excludeExportColumns)
            }
            style={{
              boxShadow: `
              inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
              inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
            `
            }}
            disabled={exportLoader}
            className={cn(
              exportLoader ? 'cursor-not-allowed' : '',
              'rounded-[10px] py-2 px-4 text-xs flex flex-row items-center  transition-all ease-in-out duration-150 bg-gray-400 hover:bg-opacity-90 cursor-pointer text-white '
            )}
          >
            {exportLoader ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2 " />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Export
          </button>
        )}
        {reportsExport && (
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs rounded-md">
              {' '}
              Export <LogOut className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  exportService({ ...query, file_type: 'pdf' }, 'PDF')
                }
              >
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportService(query, 'EXCEL')}>
                Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {
          filterSet && filterSet.length > 0 && (
            <div className="">
              <Button onClick={() => setFilter(!filter)} variant={`ghost`} className=' flex items-center justify-center px-6 py-2 min-w-max bg-[var(--secondary_color)] text-white text-xs rounded-[10px] hover:bg-[var(--secondary_color)]/90 hover:text-white'>
                <Funnel className=' w-4 h-4' />  Filters
              </Button>
            </div>
          )
        }

        {externalLinks && externalLinks.add && (
          <Link
            style={{
              boxShadow: `
                inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
                inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
                inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
                inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
              `
            }}
            id="add-button"
            href={externalLinks.add}
            className="flex min-w-[max-content] items-center rounded-[10px]  hover:border-none bg-[var(--primary_color)] hover:bg-[var(--primary_color)]/90 px-3 py-1.5  text-[13px] leading-[160%] text-white dark:font-medium"
          >
            <CirclePlusIcon className="h-2.5 w-2.5 md:h-4 md:w-4" />
            <span className="mx-1">
              Add{' '}
              {pageConfig.buttonName ? pageConfig.buttonName : pageConfig.name}
            </span>
          </Link>
        )}
        {externalLinks && externalLinks.update && (
          <Link
            style={{
              boxShadow: `
              inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
              inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
            `
            }}
            id="add-button"
            href={externalLinks.update || "/"}
            className="flex min-w-[max-content] items-center rounded-[10px]  hover:border-none bg-[var(--primary_color)] hover:bg-[var(--primary_color)]/90 px-3 py-1.5  text-[13px] leading-[160%] text-white dark:font-medium"
          >
            <CirclePlusIcon className="h-2.5 w-2.5 md:h-4 md:w-4" />
            <span className="mx-1">
              Update{' '}
              {pageConfig.buttonName ? pageConfig.buttonName : pageConfig.name}
            </span>
          </Link>
        )}
        {(pageConfig && pageConfig.customDropdownButton)
          && (externalLinks && externalLinks.customDropdownButton) && (
            <DropdownMenu>
              <DropdownMenuTrigger style={{
                boxShadow: `
                  inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
                  inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
                  inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
                  inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
                `
              }} className=" flex items-center gap-1 px-4 py-1.5 bg-primary_color hover:bg-opacity-90 text-white bg-[var(--primary_color)] hover:bg-[var(--primary_color)]/90  text-xs rounded-[10px] min-w-max">
                {pageConfig.customDropdownButton}
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white'>
                {externalLinks.customDropdownButton?.map((customButton: any) => {
                  return (
                    <DropdownMenuItem key={customButton.name}>
                      <Link
                        href={customButton.href}
                        className="flex items-center bg-white"
                      >
                        {customButton.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
      </div>
    );
  }

  function renderContent() {
    return (
      <GenericTable
        data={tableData}
        tableColumns={tableColumns}
        isLoading={isLoading}
        isScrollable={isScrollable}
        filters={filters}
        handleTableSorting={handleTableSorting}
        tableName={tableName}
        isRowSelect={isRowSelect}
      />
    );
  }

  return (
    <div style={{
      boxShadow: `
      inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
      inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
      inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
      inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
    `
    }} className="bg-white  border rounded-3xl ">
      <input
        type="file"
        id="import-button"
        className="hidden"
        onChange={(e: any) => {
          if (e.target.files) {
            importFile(e.target.files[0]);
          }
        }}
      />
      {/* {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} id={cypreessId} />} */}
      <div className={cn(filterSet && filterSet.length > 0 ? " border-b  " : "", "flex justify-between py-6 px-5")}>
        <div className="flex items-center heading">
          {fallBackURL && (
            <Link href={fallBackURL!} id={`${cypreessId}-table-back`}>
              <ArrowLeftCircleIcon className="text-color mr-2 flex h-6 w-6 items-center text-center" />
            </Link>
          )}
          {pageConfig.title} {count ? `(${count})` : ''}
        </div>
        <div className={cn(showHeaderButtons ? 'block' : 'hidden')}>
          {renderHeaderSectionButtons()}
        </div>
      </div>

      {filterSet && filterSet.length > 0 && filter && (
        <div className=" px-5 py-4 ">
          <div className={cn('drag-dropdown flex items-center gap-2 bg-[var(--primary_color)]/5 rounded-[10px]  px-5', filter ? " h-max py-2 border  " : " h-0 overflow-hidden ")}>
            <FilterContainer
              filters={filters}
              applyFilters={applyFilter}
              resetFilters={clearFilters}
              isFilterApplyDisabled={isFilterApplyDisabled}
            >
              <div className=" flex  gap-3">
                <FilterComponent
                  filterSet={filterSet}
                  filters={filters}
                  clearFilter={clearFilter}
                  handleFilters={handleFilters}
                />
              </div>
            </FilterContainer>
          </div>
        </div>
      )}

      <DeleteModal
        deleteService={deleteAPIService}
        buttonName={deleteButtonName}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        headerTitle={`${deleteButtonName || 'Delete'} ${pageConfig.name}`}
        deleteMessage={
          deleteMessage ? (
            deleteMessage(rowSelection, deleteRecordId, currentDeleteRow)
          ) : Object.keys(rowSelection).length > 1 ? (
            <p>Are you sure want to delete these {pageConfig.title}?</p>
          ) : (
            <p>
              Are you sure want to delete the{' '}
              <span className="font-bold line-clamp-10 break-words">
                {getRowName() || ''}
              </span>{' '}
              {pageConfig.name || ''}?
            </p>
          )
        }
        deleteIdArr={deleteRecordId ? [deleteRecordId] : rowSelection}
        onCancel={() => {
          setTimeout(() => {
            setDeleteRecordId(null);
          }, 500);
        }}
        onSuccessDeleteCallBack={(deleteIds: number[]) => {
          validatePagination(deleteIds);
          setRowSelection([]);
          setDeleteRecordId(null);
        }}
      />
      <div className="">
        <div className={isScrollable ? "overflow-x-scroll" : ""}>
          {renderContent()}
        </div>
        {isServerSidePagination && !isLoading ? (
          <div className=" px-2 py-3">
            <GenericPagination count={count} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
