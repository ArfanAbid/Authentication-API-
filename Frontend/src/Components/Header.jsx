import React from "react";
import { ModeToggle } from "@/components/Mode-toggle";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  console.log(authStatus);
  const user=useSelector((state) => state.auth.user);
  return (
    <>
      <div className="flex justify-between p-4">
        <div className="text-xl">
          Hello  {user===null ? <span className="text-[#48e1b1]  font-semibold">User</span> : <span className="text-[#48e1b1] text-md font-semibold">{user}</span>}
        </div>
        <div className="flex space-x-1">
          <ModeToggle />
          {authStatus && <LogoutBtn />}
        </div>
      </div>
    </>
  );
}

export default Header;
