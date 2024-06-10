import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { serverUrl } from "./serverUrl";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAuth } from "../../redux/actions/action";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openSideBar, setOpenSieBar] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
console.log(auth)

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:8080/api/auth/checkauth`, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          const { name, username, email, role, id } = res.data;
          dispatch(
            setAuth(true, name, username, email, role, id )
          );
        } else {
          dispatch(setAuth(false, null, "", "", "", ""));
        }
      })
      .catch((err) => console.log("Authentication error:", err));
  }, [location]);

  const changeSideBar = () => {
    setOpenSieBar(!openSideBar);
  };
  const showMenuItems = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="pt-5 pl-8 pr-7 py-5 bg-white flex justify-between gap-2 ">
    <div className="hidden sm:flex max-w-2xl justify-between w-full">
      <div className="flex flex-col">
        <span className="text-base md:text-xl text-[#212B36] font-semibold">
          Hello Dominik!
        </span>
        <span className="text-sm font-normal">
          Welcome back to dashboard.
        </span>
      </div>
    </div>
    <div className="flex gap-2 items-center sm:hidden">
      <img src="https://www.tailwindtap.com/assets/admin/dashboard/logo.svg" alt="logo" />
      <span className="text-xl font-semibold ">Infysales</span>
    </div>
    <div
      className="cursor-pointer sm:hidden border border-[#E7E7E7] hover:border-blue-600 group rounded-md flex justify-center items-center"
      onClick={showMenuItems}
    >
      <svg
        className="group-hover:text-blue-600 text-[#637381] w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
    <div className="hidden sm:flex gap-4">
      
      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[#E7E7E7] relative cursor-pointer group">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:fill-blue-600 fill-[#637381]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5C3.45228 5 3 5.45228 3 6V18C3 18.5477 3.45228 19 4 19H20C20.5477 19 21 18.5477 21 18V6C21 5.45228 20.5477 5 20 5H4ZM1 6C1 4.34772 2.34772 3 4 3H20C21.6523 3 23 4.34772 23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.18085 5.42656C1.49757 4.97411 2.1211 4.86408 2.57355 5.18079L12.0001 11.7794L21.4266 5.18079C21.8791 4.86408 22.5026 4.97411 22.8193 5.42656C23.136 5.87901 23.026 6.50254 22.5735 6.81926L12.5735 13.8193C12.2292 14.0603 11.7709 14.0603 11.4266 13.8193L1.42662 6.81926C0.974174 6.50254 0.864139 5.87901 1.18085 5.42656Z"
          />
        </svg>
        <div className="w-5 h-5 rounded-full bg-[#4F80E1] absolute -top-2.5 -right-1.5 text-white text-center text-xs font-medium flex justify-center items-center">
          4
        </div>
      </div>
      <div className="w-12 h-12 bg-[#F6F8FA] rounded-full flex items-center justify-center border border-[#E7E7E7] cursor-pointer group">
        <img
          src="	https://www.tailwindtap.com/assets/travelagency-admin/profile.svg"
          alt="profileicon"
        />
      </div>
    </div>
  </div>
  );
}

export default Navbar;
