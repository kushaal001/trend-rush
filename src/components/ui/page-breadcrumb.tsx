import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { CrumbItem } from "@/lib/types/generics";
import { Home } from "lucide-react";

export const PageBreadcrumb = ({ crumbs = [] as CrumbItem[] }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link className=" hover:text-red-500 " href={`/dashboard`}><Home className=" w-4 h-4" /></Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      {crumbs.map((crumb, index) => (
        <Fragment key={index}>
          {index > 0 && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            {crumb.isCurrentPage ? (
              <BreadcrumbPage className="text-blue-700">{crumb.label}</BreadcrumbPage>
            ) : crumb.isLink && crumb.href ? (
              <BreadcrumbLink asChild>
                <Link className=" hover:text-red-500 " href={crumb.href}>{crumb.label}</Link>
              </BreadcrumbLink>
            ) : (
              <span>{crumb.label}</span>
            )}
          </BreadcrumbItem>
        </Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);