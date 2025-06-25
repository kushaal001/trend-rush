// "use client";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";

// export default function DiscountForm() {
//   const [form, setForm] = useState({
//     discountCode: "",
//     products: "",
//     users: "",
//     discountType: "",
//     discountValue: "",
//     minCartValue: "",
//     maxDiscountValue: "",
//     maxUses: "",
//     maxUsesPerProduct: "",
//     maxUsesPerUser: "",
//     startDate: "",
//     endDate: "",
//     isActive: false,
//     applyPromo: false,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type, checked }:any = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleGenerateCode = () => {
//     const code = Math.random().toString(36).substr(2, 8).toUpperCase();
//     setForm({ ...form, discountCode: code });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", form);
//   };

//   return (
//     <div className="">
//       <div className=" mx-auto bg-white rounded shadow-sm p-6">
//    <h2 className="flex justify-between text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-4">

//   <span>Add Discount</span>
//     <Link
//     href="/dashboard/catalog/discounts"
//     className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition"
//   >
//     <ArrowLeft className="w-4 h-4 mr-1" />
//     Back
//   </Link>
// </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Row 1 - Discount Code */}
//           <div className="grid grid-cols-12 gap-4 items-center">
//             <div className="col-span-10">
//               <label className="block font-medium text-gray-700 mb-1">
//                 Discount code <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="discountCode"
//                 value={form.discountCode}
//                 onChange={handleChange}
//                 placeholder="Enter Discount code or generate by clicking 'Generate' button"
//                 className="w-full border px-4 py-2 rounded focus:outline-none"
//                 required
//               />
//             </div>
//             <div className="col-span-2 mt-6">
//               <button
//                 type="button"
//                 onClick={handleGenerateCode}
//                 className="bg-green-600 text-white px-4 py-2 rounded w-full"
//               >
//                 Generate
//               </button>
//             </div>
//           </div>

//           {/* Row 2 - Products / Users */}
//           <div className="grid grid-cols-2 gap-4">

//                       <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Brands 
//                 {/* <span className="text-red-500">*</span> */}
//               </label>
//               <select
//                 name="products"
//                 value={form.products}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               >
//                 <option value="">Select Brand</option>
//                 <option value="product1">Zudio</option>
//                  <option value="product1">Puma</option>
//                   <option value="product1">H&M</option>
//               </select>
//             </div>
//                                  <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Categories 
//                 {/* <span className="text-red-500">*</span> */}
//               </label>
//               <select
//                 name="products"
//                 value={form.products}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               >
//                 <option value="">Select Category</option>
//                 <option value="product1">Shirts</option>
//                  <option value="product1">Pants</option>
//                   <option value="product1">Shoes</option>
//               </select>
//             </div>
//                         <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Products 
//                 {/* <span className="text-red-500">*</span> */}
//               </label>
//               <select
//                 name="products"
//                 value={form.products}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               >
//                 <option value="">Select Products</option>
//                 <option value="product1">Product A</option>
//               </select>
//             </div>
//             {/* <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Users
//               </label>
//               <select
//                 name="users"
//                 value={form.users}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               >
//                 <option value="">Select Users</option>
//               </select>
//             </div> */}
//           </div>

//           {/* Row 3 - Discount Type / Discount Value */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Discount Type <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="discountType"
//                 value={form.discountType}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               >
//                 <option value="">Select discount type</option>
//                 <option value="percentage">Percentage</option>
//                 <option value="fixed">Amount</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Discount Value <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="discountValue"
//                 value={form.discountValue}
//                 onChange={handleChange}
//                 placeholder="Discount Value"
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Row 4 - Min Cart Value / Max Discount Value */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Minimum Cart Value <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="minCartValue"
//                 value={form.minCartValue}
//                 onChange={handleChange}
//                 placeholder="Min Cart Value"
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Maximum Discount Value <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="maxDiscountValue"
//                 value={form.maxDiscountValue}
//                 onChange={handleChange}
//                 placeholder="Max Discount Value"
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Row 5 - Max Uses / Max Uses per User */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Maximum uses <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="maxUses"
//                 value={form.maxUses}
//                 onChange={handleChange}
//                 placeholder="Max uses"
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div> */}
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Maximum uses per user <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="maxUsesPerUser"
//                 value={form.maxUsesPerUser}
//                 onChange={handleChange}
//                 placeholder="Max uses per user"
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Row 6 - Max Uses per Product */}
//           {/* <div>
//             <label className="block text-gray-700 mb-1 font-medium">
//               Maximum uses per product <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               name="maxUsesPerProduct"
//               value={form.maxUsesPerProduct}
//               onChange={handleChange}
//               placeholder="Max uses per product"
//               className="w-full border px-4 py-2 rounded"
//             />
//           </div> */}

//           {/* Row 7 - Start Date / End Date */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Start Date <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={form.startDate}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={form.endDate}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Row 8 - Checkboxes */}
//           <div className="space-y-2">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={form.isActive}
//                 onChange={handleChange}
//               />
//               <span className="text-gray-700">Active</span>
//             </label>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between items-center pt-6">
//             <button
//               type="button"
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";

import GenericForm, { FieldConfig } from "@/components/GenericForm.tsx/GenericForm";
import React, { useState } from "react";

export default function DiscountForm() {
  const [form, setForm] = useState({
    discountCode: "",
    products: "",
    discountType: "",
    discountValue: "",
    minCartValue: "",
    maxDiscountValue: "",
    maxUsesPerUser: "",
    startDate: "",
    endDate: "",
    isActive: false,
  });

  const fields: FieldConfig[] = [
    {
      name: "discountCode",
      label: "Discount Code",
      type: "text",
      required: true,
      colSpan: 1,
    },

 { name: "brand",
   label: "Brand",
    type: "select",
     required: true,
      colSpan: 1,
      options: [
        { label: "H&M", value: "h&m" },
        { label: "Zudio", value: "zudio" },
      ]
       
    },
      {
         name: "category", label: "Category", type: "select", required: true, colSpan: 1, options: [
        { label: "Shirts", value: "shirts" },
        { label: "Piant", value: "piant" },
      ]
    },
     
        {
      name: "products",
      label: "Products",
      type: "select",
       colSpan: 1,
      options: [
        { label: "Jeans", value: "jeans" },
        { label: "Denim Shirt", value: "denim-shirt" },
        { label: "Trouser", value: "trouser" },
      ],
    },
        { name: "discountType", label: "Discount Type", type: "select", required: true,
           colSpan: 1, options: [
        { label: "Percentage", value: "percentage" },
        { label: "Amount", value: "amount" },
        { label: "Buy1 Get 1", value: "buy1-get1" },
      ]
    },
    { name: "discountValue", label: "Discount Value", type: "number", colSpan: 1 },
    { name: "minCartValue", label: "Min Cart Value", type: "number" ,colSpan: 1},
    { name: "maxDiscountValue", label: "Max Discount Value", type: "number" ,colSpan: 1},
    // { name: "maxUsesPerUser", label: "Max Uses/User", type: "number" },
    { name: "startDate", label: "Start Date", type: "date",colSpan: 1 },
    { name: "endDate", label: "End Date", type: "date",colSpan: 1 },
    { name: "isActive", label: "Active", type: "checkbox" },
  ];



  const handleGenerateCode = () => {
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    setForm({ ...form, discountCode: code });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow rounded">
      <GenericForm
        title="Add Discount"
        fields={fields}
        formData={form}
        setFormData={setForm}
        onSubmit={handleSubmit}
        showBackButton
        // onGenerateCode={handleGenerateCode}
      />
    </div>
  );
}
