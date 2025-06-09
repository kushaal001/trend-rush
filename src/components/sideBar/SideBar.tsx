// components/Sidebar.tsx
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

const MenuItem = ({ title, children }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 font-medium hover:bg-gray-100"
      >
        {title}
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && <div className="pl-6">{children}</div>}
    </div>
  );
};

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-100 border-r pt-4">
      <div className="text-xl font-bold text-center mb-6">TRENDRUSH</div>
      <nav className="space-y-2">
        <MenuItem title="Home">
          <Link href="/dashboard/home/orders" className="block py-1 text-sm text-gray-700 ">Orders</Link>
          <Link href="/dashboard//home/subscribers" className="block py-1 text-sm text-gray-700 ">Subscribers</Link>
        </MenuItem>

        <MenuItem title="Catalog">
          <Link href="/dashboard/catalog/products" className="block py-1 text-sm text-gray-700 ">Products</Link>
          <Link href="/dashboard/catalog/brands" className="block py-1 text-sm text-gray-700 ">Brands</Link>
          <Link href="/dashboard/catalog/variants" className="block py-1 text-sm text-gray-700 ">Variants</Link>
          <Link href="/dashboard/catalog/categories" className="block py-1 text-sm text-gray-700 ">Categories</Link>
          <Link href="/dashboard/catalog/discounts" className="block py-1 text-sm text-gray-700 ">Discounts</Link>
          <Link href="/dashboard/catalog/reviews" className="block py-1 text-sm text-gray-700 ">Reviews</Link>
        </MenuItem>

        {/* <MenuItem title="Lab">
          <Link href="/dashboard/lab" className="block py-1 text-sm text-gray-700 hover:underline">Reports</Link>
        </MenuItem>

        <MenuItem title="Holograms">
          <Link href="/dashboard/holograms" className="block py-1 text-sm text-gray-700 hover:underline">Inventory</Link>
        </MenuItem> */}
      </nav>
    </div>
  );
}
