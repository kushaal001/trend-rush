import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Package,
  Home,
  Percent,
  Tags,
  Star,
  Users,
  Box,
  Layers,
  ClipboardList,
  FlaskConical,
  ScanBarcode,
} from "lucide-react";
import { usePathname } from "next/navigation";

const MenuItem = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
    className={`${
  open ? "bg-[#e4e8ee]" : "bg-[#f2f2f2]"
} flex cursor-pointer items-center justify-between w-full px-4 py-3 border-t-[1px] hover:bg-gray-200 transition-colors`}
 >
        <span className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {title}
        </span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && <div className=" space-y-[1px]">{children}</div>}
    </div>
  );
};


const SidebarLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block text-sm py-2 pl-10 px-2 w-full rounded 
        ${isActive ? "bg-[#d3d8e0] font-medium text-gray-900" : "text-gray-700 hover:bg-gray-300"}
      `}
    >
      {label}
    </Link>
  );
};

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#f2f2f2] border-r pt-4 overflow-y-auto">
      <nav className=" mt-10">

        <MenuItem title="Home" icon={<ScanBarcode size={16} />}>
          <SidebarLink href="/dashboard/home/orders" label="Orders" />
          <SidebarLink href="/dashboard/home/subscribers" label="Subscribers" />
        </MenuItem>

        <MenuItem title="Catalog" icon={<Tags size={16} />}>
          <SidebarLink href="/dashboard/catalog/products" label="Products" />
          <SidebarLink href="/dashboard/catalog/brands" label="Brands" />
          <SidebarLink href="/dashboard/catalog/variants" label="Variants" />
          <SidebarLink href="/dashboard/catalog/categories" label="Categories" />
          <SidebarLink href="/dashboard/catalog/discounts" label="Discounts" />
          <SidebarLink href="/dashboard/catalog/reviews" label="Reviews" />
        </MenuItem>

      </nav>
    </div>
  );
}
