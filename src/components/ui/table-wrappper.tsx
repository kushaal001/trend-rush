"use client"
import React, { memo, useCallback } from 'react';
import { FilterIcon, PlusIcon } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { AdditionalButtonHeaderConfig } from '@/lib/types/helpers';
import { cn } from '@/lib/utils';

interface TableWrapperProps {
  isLoading: boolean;
  headerText: string;
  showCount?: boolean;
  count: number;
  showFilterButton?: boolean;
  showFilter?: boolean;
  setShowFilter?: (showFilter: boolean) => void;
  showExportButton?: boolean;
  handleExport?: () => void;
  exportText?: string;
  showImportButton?: boolean;
  handleImport?: () => void;
  importText?: string;
  showAddButton?: boolean;
  route?: string;
  addButtonText?: string;
  additionalButtons?: AdditionalButtonHeaderConfig[];
}

const TableWrapper = memo(function TableWrapper({
  children, headerText, isLoading, showCount = true, count, showFilterButton = false, showFilter, setShowFilter, showAddButton = false, route, addButtonText = "Add", showExportButton = false, handleExport, exportText = "Export", showImportButton = false, handleImport, importText = "Import", additionalButtons = [],
}: React.PropsWithChildren<TableWrapperProps>) {
  const router = useRouter();

  const handleFilterToggle = useCallback(() => {
    if (setShowFilter) {
      setShowFilter(!showFilter);
    }
  }, [setShowFilter, showFilter]);

  const handleExportClick = useCallback(() => {
    if (handleExport) {
      handleExport();
    }
  }, [handleExport]);

  const handleImportClick = useCallback(() => {
    if (handleImport) {
      handleImport();
    }
  }, [handleImport]);

  const handleAddClick = useCallback(() => {
    if (route) {
      router.push(route);
    }
  }, [route, router]);

  return (
    <div className="space-y-4">
      <div className="md:flex justify-between items-center">
        <div className='flex flex-row items-center justify-between'>
        <h1 className="lg:text-[28px] text-[20px] font-medium">
          {`${headerText}${!isLoading && showCount ? ` (${count})` : ""}`}
        </h1>
        <div className='block lg:hidden md:hidden mt-1 gap-1'>
        {showFilterButton && (
            <Button type="button" onClick={handleFilterToggle} variant="outline" size="default" className='mr-1'>
              <FilterIcon aria-hidden="true" className="size-4 " />
            </Button>
          )}
        {showAddButton && (
            <Button variant="default" size="sm" className='text-xs' onClick={handleAddClick}>
              <PlusIcon className="size-4" />
              {addButtonText}
            </Button>
          )}
        </div>
        </div>
        <div className="flex flex-wrap items-center space-x-2 py-1 lg:py-0 space-y-1 lg:space-y-0">
          <div className='hidden md:block lg:block'>
          {showFilterButton && (
            <Button type="button" onClick={handleFilterToggle} variant="outline" size="default" className='mt-1 lg:mt-0'>
              <FilterIcon aria-hidden="true" className="size-4 mr-1 " />
              <span className="text-sm">Filters</span>
            </Button>
          )}
          </div>
          {showExportButton && (
            <Button variant="outline" size="sm" onClick={handleExportClick}>
              {exportText}
            </Button>
          )}
          {showImportButton && (
            <Button variant="outline" size="sm" onClick={handleImportClick}>
              {importText}
            </Button>
          )}
          {additionalButtons.map((button, index) => {
            // Determine if button should be shown
            const shouldShow = button.show !== false;
            if (!shouldShow) return null;

            // Determine size based on content
            const buttonSize = button.size || (button.text && !button.icon ? "sm" : "icon");

            return (
              <Button
                key={index}
                variant={button.variant || "ghost"}
                size={buttonSize}
                onClick={() => button.onClick()}
                className={cn(button.className, "flex")}
                title={button.tooltip}
              >
                {button.icon}
                {button.text && <span className={button.icon ? "ml-1" : ""}>{button.text}</span>}
              </Button>
            );
          })}
          <div className='lg:flex md:flex hidden'>
          {showAddButton && (
            <Button variant="default" size="sm" onClick={handleAddClick}>
              <PlusIcon className="size-4" />
              {addButtonText}
            </Button>
          )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
});

export default TableWrapper;
