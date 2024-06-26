import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import DropDowns from "../../Common/DropDowns";
import axios from 'axios';

const cardData = [
    {
      type: "Users",
      percentage: "50.43%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/uparrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph1.svg",
      price: "329",
    },
    {
      type: "Email Sents",
      percentage: "12.32%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/uparrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph1.svg",
      price: "200",
    },
    {
      type: "Email Opened",
      percentage: "10.89%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/uparrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph1.svg",
      price: "150",
    },
    {
      type: "Email Replied",
      percentage: "20.92%",
      arrow: "https://www.tailwindtap.com/assets/admin/dashboard/downarrow.svg",
      graph: "https://www.tailwindtap.com/assets/admin/dashboard/graph3.svg",
      price: "100",
    },
  ];



  const people = [
    { name: "All " },
    { name: "Active" },
    { name: "Inactive" },
  ];


const DashboardAdmin = () => {
  const [user, setusers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/usersList');
        setusers(response.data); // Log the fetched data
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = user.filter(user => 
    user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [openSideBar, setOpenSieBar] = useState(true);

 
  return (
    <div className="w-full py-3 pl-7 pr-5 grid xl:grid-cols-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-start">
    {cardData?.map((data, key) => (
      <div
        className="p-5 xl:col-span-3 bg-white flex flex-col  2xl:max-w-none w-full rounded-xl gap-2 border border-[#E7E7E7] hover:shadow-xl cursor-pointer"
        key={key}
      >
        <div
          className={`flex justify-between ${
            openSideBar ? " sm:flex-col md:flex-row" : " sm:flex-row"
          }`}
        >
          <span className="text-[#637381] text-sm font-medium">
            {data?.type}
          </span>
          <div className="flex gap-1 items-center">
            <span className="">{data?.percentage} </span>
            <img src={data?.arrow} alt="graph" />
          </div>
        </div>
        <div
          className={`flex gap-4  justify-between ${
            openSideBar
              ? "flex-wrap sm:flex-col md:flex-row items-end md:flex-nowrap"
              : "flex-nowrap items-center"
          }`}
        >
          <span className="text-2xl font-bold whitespace-nowrap">
           {user.length}
          </span>
          <img src={data?.graph} alt="graph" />
        </div>
      </div>
    ))}

    <div className="p-3 bg-white flex flex-col xl:col-span-12 xl:row-auto lg:row-start-4  rounded-xl border border-[#E7E7E7]">
      <div className="flex items-center justify-between flex-wrap gap-1">
        <div className="lg:max-w-sm w-2/5 lg:w-full border focus-within:border-blue-600 rounded-lg border-[#E7E7E7] py-1 px-4 justify-between items-center max-h-12 hidden md:flex">
          <input
            type="text"
            className="outline-none w-9/12"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.16667 3.33335C5.94501 3.33335 3.33334 5.94503 3.33334 9.16669C3.33334 12.3883 5.94501 15 9.16667 15C12.3883 15 15 12.3883 15 9.16669C15 5.94503 12.3883 3.33335 9.16667 3.33335ZM1.66667 9.16669C1.66667 5.02455 5.02454 1.66669 9.16667 1.66669C13.3088 1.66669 16.6667 5.02455 16.6667 9.16669C16.6667 13.3088 13.3088 16.6667 9.16667 16.6667C5.02454 16.6667 1.66667 13.3088 1.66667 9.16669Z"
              fill="#637381"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.2857 13.2858C13.6112 12.9603 14.1388 12.9603 14.4643 13.2858L18.0893 16.9108C18.4147 17.2362 18.4147 17.7638 18.0893 18.0893C17.7638 18.4147 17.2362 18.4147 16.9108 18.0893L13.2857 14.4643C12.9603 14.1388 12.9603 13.6112 13.2857 13.2858Z"
              fill="#637381"
            />
          </svg>
        </div>
        <div>Total Users : {user.length}</div>
        <DropDowns list={people} />
      </div>
      <div className="w-full overflow-x-scroll md:overflow-auto  mt-1">
        <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1">
          <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
            <tr className="">
              <th className="py-3 pl-3 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-l-lg">
              <div class="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-all-search" class="sr-only">
                            checkbox
                          </label>
                        </div>
              </th>
              <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap">
                Name
              </th>
              <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                Email
              </th>
              <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                No. of clients
              </th>
     
              {/* <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-r-lg">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((data) => (
              <tr
                key={data.user_id}
                className="drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] bg-[#f6f8fa] hover:shadow-2xl cursor-pointer"
              > 
                <td className="py-4 pl-3 text-sm font-normal text-[#637381] rounded-l-lg">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="py-2 px-1 text-sm font-normal text-[#637381]">
                  {data.user_name}
                </td>
                <td className="py-2 px-1 text-sm font-normal text-[#637381]">
                  {data.user_email}
                </td>
                <td className="py-2 px-1 text-sm font-normal text-[#637381]">
                  {data.client_count}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 pl-3 text-center text-sm font-normal text-[#637381]">
                No records found
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    </div>
   
  </div>
  );
};

export default DashboardAdmin;
