"use client";

import { Fragment, Suspense } from 'react';
import Header from './Header';
import Sidebar from './SideBar';

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Fragment>
      {/* <Suspense fallback={<Loading />}> */}
        <Header />
      {/* </Suspense> */}
      <div className=" flex w-full  ">
        {/* <Suspense fallback={<Loading />}> */}
          <Sidebar />
        {/* </Suspense> */}
        <div className="w-full overflow-hidden relative pt-[11vh] pb-6 px-4 bg-[#f2f2f2]/50  ">
          <div className="overflow-y-auto  h-full">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
