import { Fragment, useCallback, useState } from "react";
import TableWrapper from "./table-wrappper";
import { getColumnsWithActions } from "./columns-helper";
import { DataTable } from "./data-table";
import DeleteModal from "./delete-modal";
import { ColumnDef, Row } from "@tanstack/react-table";
import Pagination from "./pagination";
import { AdditionalButtonConfig, AdditionalButtonHeaderConfig } from "@/lib/types/helpers";
import { TabItem, TabSections } from "./tab-sections";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { parseObjToQuery } from "@/lib/helpers";
import { FilterContainer } from "./table/filters/FilterContainer";
import FilterComponent from "./table/filters/FilterComponent";
interface TableHelperProps<T> {
  fetchData: () => void | Promise<void>;
  isLoading: boolean;
  actionsConfig: {
    showPagination?: boolean;
    showEditButton?: boolean | ((row: Row<T>) => boolean);
    editRoute: (id: number, row: Row<T>) => void;
    editButtonClassName?: string;
    showDeleteButton?: boolean | ((row: Row<T>) => boolean);
    deleteModalTitle?: string;
    deleteButtonClassName?: string;
    additionalButtons?: AdditionalButtonConfig<T>[];
  };
  headerConfig: {
    title: string;
    addButtonText?: string;
    addRoute?: string;
    showCount?: boolean;
    showFilterButton?: boolean;
    showAddButton?: boolean;
    showExportButton?: boolean;
    showImportButton?: boolean;
    additionalButtons?: AdditionalButtonHeaderConfig[];
  };
  count?: number;
  columns: ColumnDef<T>[];
  needButtonsInTableRow?: boolean;
  data: T[];
  deleteService: (id: string | number) => Promise<{ errors?: { non_field_errors?: string | string[] } }>;
  queries: Record<string, number | string> | undefined;
  isScrollable?: boolean;
  defaultTabValue?: string | number;
  tabs?: TabItem[];
  handleTabChange?: (value: string) => void;
  setFilters?: (filters: any) => void;
  showFilters?: boolean;
  filterSet?: any;
  registerAPIFilters?: string[];
  filters?: Record<string, any>;
  setShowFilters?: (showFilters: boolean) => void;
  onResetFilterFallback?: () => void;
}

export default function TableHelper<T extends { id: string | number }>({
  fetchData,
  isLoading,
  actionsConfig,
  headerConfig,
  count = 0,
  columns,
  data,
  deleteService,
  queries,
  needButtonsInTableRow = true,
  isScrollable = false,
  tabs = [],
  defaultTabValue,
  handleTabChange,
  setFilters,
  showFilters,
  filterSet,
  setShowFilters,
  registerAPIFilters,
  filters,
  onResetFilterFallback
}: TableHelperProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const applyFilter = useCallback(() => {
    const newQuery = { ...queries };
    Object.keys(filters || {}).forEach((item) => {
      const value = (filters ?? {})[item];
      if (value) {
        if (Array.isArray(value)) {
          if (value.length) {
            newQuery[item] = value
              .map((selectedKeyItem: any) => selectedKeyItem.id)
              .join(",");
          } else {
            delete newQuery[item];
          }
        } else if (typeof value === "object") {
          newQuery[item] = value.id || value.value;
        } else if (typeof value === "string") {
          newQuery[item] = value;
        }
        if ("page" in newQuery) {
          delete newQuery.page;
        }
      } else {
        delete newQuery[item];
      }
      if (!(item in (filters ?? {}))) {
        delete newQuery[item];
      }
    });
    router.push(`${pathName}/${parseObjToQuery(newQuery)}`);
  }, [queries, filters, router, pathName, parseObjToQuery]);

  const clearFilter = useCallback((filterName: string) => {
    setFilters!((prevState: any) => {
      const newState = { ...prevState };
      if (newState[filterName]) {
        newState[filterName] = null;
      }
      return newState;
    });
  }, [setFilters]);


  const clearFilters = useCallback(() => {
    const newQuery = { ...queries };
    if (registerAPIFilters) {
      registerAPIFilters.forEach((dataIndex: string) => {
        if (dataIndex !== "search") {
          delete newQuery[dataIndex];
        }
      });
    }
    const newItems: any = {};
    (registerAPIFilters ?? []).map((item: string) => {
      if (item !== "search") {
        newItems[item] = null;
      }
    });
    setFilters?.(newItems);
    if (onResetFilterFallback) {
      onResetFilterFallback();
    }
    router.push(`${pathName}/${parseObjToQuery(newQuery)}`);
  }, [queries, registerAPIFilters, setFilters, router, pathName, parseObjToQuery]);


  function handleFilters(dataIndex: string, value: any) {
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

  return (
    <Fragment>
      <TableWrapper
        isLoading={isLoading}
        headerText={headerConfig.title}
        showCount={headerConfig.showCount}
        count={count}
        showFilterButton={headerConfig.showFilterButton}
        showAddButton={headerConfig.showAddButton}
        route={headerConfig.addRoute}
        addButtonText={headerConfig.addButtonText}
        showExportButton={headerConfig.showExportButton}
        showImportButton={headerConfig.showImportButton}
        additionalButtons={headerConfig.additionalButtons}
        showFilter={showFilters}
        setShowFilter={setShowFilters}
      >
        {filterSet && filterSet.length > 0 && (
          <div
            className={cn(
              showFilters ? "open" : "h-0 w-full overflow-hidden",
              " flex items-center gap-2",
            )}
          >
            <FilterContainer
              applyFilters={applyFilter}
              resetFilters={clearFilters}  isFilterApplyDisabled={false}            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <FilterComponent
                  filterSet={filterSet}
                  filters={filters}
                  clearFilter={clearFilter}
                  handleFilters={handleFilters}
                />
              </div>
            </FilterContainer>
          </div>
        )}
        {tabs.length > 0 && <TabSections defaultValue={defaultTabValue ? defaultTabValue : ''} tabs={tabs} onChange={handleTabChange} />}
        <div className="border rounded-md overflow-hidden flex flex-col">
          <div className="overflow-x-auto min-w-full">
            <DataTable
              tableColumns={needButtonsInTableRow ? getColumnsWithActions(
                setSelectedValue,
                setShowDeleteModal,
                actionsConfig.editRoute,
                columns,
                {
                  showEditButton: actionsConfig.showEditButton,
                  showDeleteButton: actionsConfig.showDeleteButton,
                  editButtonClassName: actionsConfig.editButtonClassName,
                  deleteButtonClassName: actionsConfig.deleteButtonClassName,
                  additionalButtons: actionsConfig.additionalButtons
                },
              ) : columns}
              tableData={data}
              showHeader={true}
              isLoading={isLoading}
              isScrollable={isScrollable}
              needButtonsInTableRow={needButtonsInTableRow && (actionsConfig.additionalButtons?.length ?? 0) > 0}
            />
          </div>
        </div>
        {!isLoading && actionsConfig.showPagination && count > 20 && <Pagination count={count} queries={queries} />}
      </TableWrapper>
      <DeleteModal
        title={actionsConfig.deleteModalTitle}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        fetchData={fetchData}
        deleteService={deleteService}
      />
    </Fragment>
  );
}
