import React, { useState } from "react";

const TableData = [
  // (Same as your data array)
  {
    id: 1,
    month: "January",
    fest: "New Year's Day",
    date: "1 January, 2024",
  },
  {
    id: 2,
    month: "January",
    fest: "Makar Sankranti",
    date: "14 January, 2024",
  },
  {
    id: 3,
    month: "January",
    fest: "Republic Day",
    date: "26 January, 2024",
  },
  {
    id: 4,
    month: "February",
    fest: "Vasant Panchami",
    date: "14 February, 2024",
  },
  {
    id: 5,
    month: "March",
    fest: "Holi",
    date: "25 March, 2024",
  },
  {
    id: 6,
    month: "April",
    fest: "Ram Navami",
    date: "17 April, 2024",
  },
  {
    id: 7,
    month: "April",
    fest: "Mahavir Jayanti",
    date: "21 April, 2024",
  },
  {
    id: 8,
    month: "April",
    fest: "Good Friday",
    date: "26 April, 2024",
  },
  {
    id: 9,
    month: "May",
    fest: "Eid al-Fitr",
    date: "23 May, 2024",
  },
  {
    id: 10,
    month: "June",
    fest: "Ganga Dussehra",
    date: "15 June, 2024",
  },
  {
    id: 11,
    month: "July",
    fest: "Rath Yatra",
    date: "8 July, 2024",
  },
  {
    id: 12,
    month: "July",
    fest: "Eid al-Adha",
    date: "28 July, 2024",
  },
  {
    id: 13,
    month: "August",
    fest: "Raksha Bandhan",
    date: "19 August, 2024",
  },
  {
    id: 14,
    month: "August",
    fest: "Independence Day",
    date: "15 August, 2024",
  },
  {
    id: 15,
    month: "August",
    fest: "Janmashtami",
    date: "26 August, 2024",
  },
  {
    id: 16,
    month: "September",
    fest: "Ganesh Chaturthi",
    date: "7 September, 2024",
  },
  {
    id: 17,
    month: "October",
    fest: "Gandhi Jayanti",
    date: "2 October, 2024",
  },
  {
    id: 18,
    month: "October",
    fest: "Dussehra",
    date: "13 October, 2024",
  },
  {
    id: 19,
    month: "October",
    fest: "Diwali",
    date: "31 October, 2024",
  },
  {
    id: 20,
    month: "November",
    fest: "Guru Nanak Jayanti",
    date: "15 November, 2024",
  },
  {
    id: 21,
    month: "December",
    fest: "Christmas",
    date: "25 December, 2024",
  },
];

const FestivalList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TableData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(TableData.length / itemsPerPage);

  return (
    <>
      <div className="w-full py-3 pl-7 pr-5 grid xl:grid-cols-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-start">
        <div className="p-3 bg-white flex flex-col xl:col-span-12 xl:row-auto lg:row-start-4 rounded-xl border border-[#E7E7E7]">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <div className="lg:max-w-sm w-2/5 lg:w-full border focus-within:border-blue-600 rounded-lg border-[#E7E7E7] py-1 px-4 justify-between items-center max-h-12 hidden md:flex">
              <input
                type="text"
                className="outline-none w-9/12"
                placeholder="Search..."
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
            <button className="mt-4 px-4 py-2 text-base font-semibold text-white bg-blue rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
              Add Festivals
            </button>
          </div>
          <div className="w-full overflow-x-scroll md:overflow-auto mt-1">
            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1">
              <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                <tr>
                  <th className="py-3 pl-3 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-l-lg">
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
                  </th>
                  <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap">
                    Month
                  </th>
                  <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                    Festivals
                  </th>
                  <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                    Date
                  </th>
                  <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-r-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((data) => (
                  <tr
                    key={data.id}
                    className="drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] bg-[#f6f8fa] hover:shadow-2xl cursor-pointer"
                  >
                    <td className="py-4 pl-3 text-sm font-normal text-[#637381] rounded-l-lg">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${data.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor={`checkbox-${data.id}`} className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                      {data.month}
                    </td>
                    <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                      {data.fest}
                    </td>
                    <td className="py-4 px-2.5 text-sm font-normal text-[#637381]">
                      {data.date}
                    </td>
                    <td className="py-4 px-1 text-sm font-normal text-[#637381] rounded-r-[8px] flex gap-3">
                      <i className="fa-solid fa-trash"></i>
                      <i className="fa-solid fa-user-pen"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 justify-center items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-base font-semibold text-white bg-blue rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-300"
            >
              Prev...
            </button>
            <span className="text-sm text-gray-700">
             {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-base font-semibold text-white bg-blue rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalList;
