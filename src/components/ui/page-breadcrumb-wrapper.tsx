import { PropsWithChildren } from "react";
import { PageBreadcrumb } from "./page-breadcrumb";
import { CrumbItem } from "@/lib/types/generics";

interface PageBreadcrumbWrapperProps {
  crumbs: CrumbItem[];
}

export default function PageBreadcrumbWrapper({ children, crumbs }: PropsWithChildren<PageBreadcrumbWrapperProps>) {
  return (
    <div className="space-y-3">
      <PageBreadcrumb crumbs={crumbs} />
      {children}
    </div>
  )

}