import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  ScanBarcode,
  Tags,
} from "lucide-react";
import { usePathname } from "next/navigation";

const MenuItem = ({
  title,
  icon,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`${
          isOpen ? "bg-[#e4e8ee]" : "bg-[#f2f2f2]"
        } flex cursor-pointer items-center justify-between w-full px-4 py-3 border-t-[1px] hover:bg-gray-200 transition-colors`}
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {title}
        </span>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isOpen && <div className="space-y-[1px]">{children}</div>}
    </div>
  );
};

const SidebarLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  // Check if current path starts with link href (supports nested routes)
  const isActive = pathname.startsWith(href);

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
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Automatically open menu when child link is active
  useEffect(() => {
    const newOpenStates: Record<string, boolean> = {};
    
    // Menu definitions with base paths
    const menuDefinitions = [
      {
        title: "Home",
        basePath: "/dashboard/home",
      },
      {
        title: "Catalog",
        basePath: "/dashboard/catalog",
      },
    ];

    // Check which menus should be open based on current path
    menuDefinitions.forEach(menu => {
      newOpenStates[menu.title] = pathname.startsWith(menu.basePath);
    });

    setOpenMenus(newOpenStates);
  }, [pathname]);

  const handleToggle = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="w-64 h-screen bg-[#f2f2f2] border-r pt-4 overflow-y-auto">
      <nav className="mt-10">
        <MenuItem
          title="Home"
          icon={<ScanBarcode size={16} />}
          isOpen={!!openMenus["Home"]}
          onToggle={() => handleToggle("Home")}
        >
          <SidebarLink href="/dashboard/home/orders" label="Orders" />
          <SidebarLink href="/dashboard/home/subscribers" label="Subscribers" />
        </MenuItem>

        <MenuItem
          title="Catalog"
          icon={<Tags size={16} />}
          isOpen={!!openMenus["Catalog"]}
          onToggle={() => handleToggle("Catalog")}
        >
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