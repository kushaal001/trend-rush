import UserAuthInitiateForm from "@/components/user/Initiate";
import UserAuthVerifyForm from "@/components/user/Verify";
import { useContext } from "react";

export default function Page() {
      const { details: userAuthDetails }: any = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UserAuthVerifyForm userData={userAuthDetails} />
    </div>
  );
}
