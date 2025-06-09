"use client";

import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";



export default function DashboardLayout({ children, userData,  }: any) {
// const user:any = usersDetailsData
//   const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setUserDetails(userData));
    // dispatch(setUserDetails(user))
  }, []);
  return (
    <>
      <Header />
      <div className=" flex w-full bg-[#f2f2f2] ">
        <Sidebar  />
        <div className=" w-full overflow-hidden h-screen relative pt-[11vh] pb-6 px-4 bg-white ">
          <div className=" overflow-y-auto     ">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
