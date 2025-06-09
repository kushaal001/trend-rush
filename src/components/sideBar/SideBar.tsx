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
        className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-200 transition-colors`}
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {title}
        </span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && <div className="pl-10 space-y-1">{children}</div>}
    </div>
  );
};

const SidebarLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="block text-sm text-gray-700  py-1"
  >
    {label}
  </Link>
);

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-100 border-r pt-4 overflow-y-auto">
      <div className="text-xl font-bold text-center mb-6">TRENDRUSH</div>
      <nav className="space-y-2">

        <MenuItem title="Home" icon={<ScanBarcode size={16} />}>
          <SidebarLink href="/dashboard/catalog/orders" label="Orders" />
          <SidebarLink href="/dashboard/catalog/subscribers" label="Subscribers" />
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
