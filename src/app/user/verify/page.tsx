import UserAuthInitiateForm from "@/components/user/Initiate";
import UserAuthVerifyForm from "@/components/user/Verify";
import { useContext } from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UserAuthVerifyForm />
    </div>
  );
}
