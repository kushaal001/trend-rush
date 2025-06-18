// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";

// const heroImages = [
//   "/Nike.webp",
//   "/MH_Home_Originals_Women_4cda210de5.webp",
//   "/Nike2.webp",
// ];

// export default function HomePage() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % heroImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="space-y-10">
//       {/* Hero Carousel */}
//       <div className="w-full h-64 md:h-[500px] overflow-hidden relative">
//         {heroImages.map((src, i) => (
//           <img
//             key={i}
//             src={src}
//             alt={`Slide ${i + 1}`}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
//               index === i ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Stores Near Me */}
//       <section className="px-6 md:px-12">
//         <h2 className="text-2xl font-semibold mb-4">Stores Near Me</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {["Nike", "Zara", "H&M", "Adidas"].map((store, i) => (
//             <div
//               key={i}
//               className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
//             >
//               <h3 className="font-bold text-lg">{store}</h3>
//               <p className="text-sm text-gray-500">2.5 km away</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="px-6 md:px-12">
//         <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="bg-white border rounded-lg shadow hover:shadow-md transition"
//             >
//               <img
//                 src={`/images/product${(i % 4) + 1}.jpg`}
//                 alt={`Product ${i + 1}`}
//                 className="w-full h-48 object-cover rounded-t"
//               />
//               <div className="p-3">
//                 <h4 className="font-medium">Product {i + 1}</h4>
//                 <p className="text-gray-500 text-sm">$ {(i + 1) * 10}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Men, Women, Kids Categories */}
//       <section className="px-6 md:px-12">
//         <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {["Men", "Women", "Kids"].map((label, i) => (
//             <div
//               key={i}
//               className="relative group h-48 overflow-hidden rounded-lg"
//             >
//               <img
//                 src={`/images/${label.toLowerCase()}.jpg`}
//                 alt={label}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-bold text-2xl">
//                 {label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import React from "react";

export default function AdminLoginPage() {
  return (
<div className="min-h-screen flex overflow-hidden items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 font-sans">
  <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
    

    {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-teal-400 to-sky-400 rounded-t-2xl"></div> */}


    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">TrendRush</h1>
      <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
    </div>

    <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
<Link href="/login" >
    <button className="w-full cursor-pointer py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition mb-4">
      Sign In to Admin Portal
    </button>
    </Link>
<Link href="/sign-up/business-type">
    <button className="w-full cursor-pointer py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">
      Register as New Merchant
    </button>
</Link>
    <div className="mt-4 text-center">
      <a href="#" className="text-sm text-indigo-500 underline hover:text-indigo-600">Forgot Password?</a>
    </div>
  </div>
</div>
  );
}
