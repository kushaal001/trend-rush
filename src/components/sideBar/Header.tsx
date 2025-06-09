"use client";


import { LockKeyhole, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function Header() {
  const router = useRouter();
//    const { details }: any = useContext(UserContext);


  const renderName = () => {
    // if (details) {
      return (
        <div className="border h-[40px] w-[40px] rounded-full flex items-center justify-center uppercase shadow">
          {/* <span>{details.first_name?.[0]}</span>
          <span>{details.last_name?.[0]}</span> */}
          SK
        </div>
      );
    // }
    return null;
  };

  return (
    <div className="w-full primary-color h-14 bg-[var(--primary_color)] text-white  flex justify-between items-center fixed top-0 left-0 right-0 z-[999]">
      <div className="flex items-center justify-start  border-none px-4 text-xl ">
        <img src="/cream-logo.png" alt="" className=" w-[100px]" />
      </div>
      <div className="flex items-center p-2 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>{renderName()}</DropdownMenuTrigger>
          <DropdownMenuContent style={{
              boxShadow: `
              inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
              inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
              inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
            `
            }} id="user_menu" className="w-56 bg-white mt-3">
            <DropdownMenuLabel>
              <h1 className="font-semibold capitalize">
                {/* {details?.first_name ?? ""} {details?.last_name ?? ""} */}
              </h1>
              <p className="font-medium text-gray-600 text-lg">
                {/* {details?.role?.name ?? ""} */}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              id="change_password"
              onClick={() => {
                router.push("/dashboard/change-password");
              }}
            >
              <LockKeyhole className="h-4 w-4" />
              <span>Change password</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
