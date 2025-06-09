import React from 'react';

const brands = [
  { id: 1, name: 'Nike', slug:'nike', logo: 'https://logo.clearbit.com/nike.com' },
  { id: 2, name: 'Adidas', slug:'nike', logo: 'https://logo.clearbit.com/adidas.com' },
  { id: 3, name: 'Zudio', slug:'zudio', logo: 'https://logo.clearbit.com/apple.com' },
  { id: 4, name: 'H&M', slug:'h&m', logo: 'https://logo.clearbit.com/samsung.com' },
  { id: 5, name: 'Trends', slug:'trends', logo: 'https://logo.clearbit.com/sony.com' },
];

export default function BrandsTable() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Brands List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Logo</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Brand Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Slug</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 text-md">{brand.name}</td>
                <td className="px-6 py-4 text-gray-800 text-md">{brand.slug}</td>
                <td className="px-6 py-4">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
