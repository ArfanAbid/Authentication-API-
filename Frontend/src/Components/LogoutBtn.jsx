import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleClick} className="text-[#f0724c] hover:text-red-500">
        <LuLogOut size={28}/>
      </button>
    </div>
  );
};

export default LogoutBtn;
