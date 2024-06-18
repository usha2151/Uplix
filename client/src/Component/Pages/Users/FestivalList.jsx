import React, { useEffect, useState } from "react";
import DropDowns from "../../Common/DropDowns";
import { useDispatch, useSelector } from 'react-redux';
import { AddFestivals, verifyFestival } from "../../../redux/actions/action";
import axios from "axios";


const people = [
  { name: "All " },
  { name: "Active" },
  { name: "Inactive" },
];

const FestivalList = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const festivals = useSelector((state)=> state.festivalPendingReducer.pendingNotifications);
  const auth = useSelector((state) => state.auth);
  const userId = auth.id;

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = festivals.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      (user.festival_name && user.festival_name.toLowerCase().includes(query)) ||
      (user.festival?.festival_name && user.festival_name.toLowerCase().includes(query)) ||
      (user.festival?.festival_date && user.festival_date.toLowerCase().includes(query))
    );
  });

  useEffect(()=>{
    dispatch(verifyFestival())
  },[dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const [showModel, setModel] = useState(false); // State to manage form visibility
  const [festivalDate, setFestivalDate] = useState('');
  const [festivalName, setFestivalName] = useState('');
  const [festivalTitle, setFestivalTitle] = useState('');
  const [selectedFestivals, setSelectedFestivals] = useState([]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

// fetch selected festivals by the user

  useEffect(() => {
    const fetchSelectedFestivals = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/festivals/getSelectedFestivals/${userId}`);
        setSelectedFestivals(response.data.selectedFestivals);
       
       
      } catch (error) {
        console.error('Error fetching selected festivals:', error);
      }
    };

    fetchSelectedFestivals();
  }, [userId]);


  // to selected user festivals

  const handleCheckboxChange = async (festivalId, isChecked) => {
    // Update the local state
    const updatedSelectedFestivals = isChecked
      ? [...selectedFestivals, festivalId]
      : selectedFestivals.filter(id => id !== festivalId);
    setSelectedFestivals(updatedSelectedFestivals);

    // Send the update to the backend

    try {
      await axios.post('http://localhost:8080/festivals/selectedFestivals', {
        userId,
        festivalId,
        isSelected: isChecked,
      });
      console.log('Festival selection updated successfully');
    } catch (error) {
      console.error('Error updating festival selection:', error);
    }
  };

    // Toggle form visibility
    const toggleForm = () => {
      setModel(!showModel);
    };

    const handleAddFestival = async (event) => {
      event.preventDefault();
    
      // Check for duplicate festival name
      const isDuplicateName = festivals.some(festival => festival.name === festivalName);
    
      if (isDuplicateName) {
        alert('Festival name already exists. Please add a new Festival.');
        return;
      }
  
      const festivalData = {
          date: festivalDate,
          name: festivalName,
          title: festivalTitle
        };
    
      dispatch(AddFestivals(festivalData, 'user'));
  
      // Reset input fields after dispatching the action
      setFestivalName('');
      setFestivalDate('');
      setFestivalTitle('');
      setModel(false);
    };

  // Calculate the total number of pages
  const totalPages = Math.ceil(festivals.length / itemsPerPage);

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
            <div className="flex flex-wrap gap-4">
              <div>
              <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-blue  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No. of Festivals: {festivals.length}</button>
              </div>
            <button onClick={toggleForm}  className="px-4  text-base font-semibold text-white bg-blue rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
              Add Festivals
            </button>
            <DropDowns list={people} />
            </div>
          
          </div>
          <div className="w-full overflow-x-scroll md:overflow-auto mt-1">
      <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1">
        <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
          <tr>
            <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap">
              S. No
            </th>
            <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
              Festival Name
            </th>
            <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
              Festival Date
            </th>
            <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
              Select Festival
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data, index) => (
            <tr
              key={data.festival_id}
              className="drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] bg-[#f6f8fa] hover:shadow-2xl cursor-pointer"
            >
              <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                {index + 1}
              </td>
              <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                {data.festival_name}
              </td>
              <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                {data.festival_date}
              </td>
              <td className="py-4 px-1 text-sm font-normal text-[#637381]">
                <input
                  type="checkbox"
                  checked={selectedFestivals.includes(data.festival_id)}
                  onChange={(e) =>
                    handleCheckboxChange(data.festival_id, e.target.checked)
                  }
                />
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
              {/* Show Model to add festival */}
      {showModel && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '350px', height: 'auto', padding: '20px' }}>
            {/* Close Icon */}
            <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-600" onClick={toggleForm}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Form */}
            <form onSubmit={handleAddFestival}>
            <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2">Date of Festival</label>
          <input
            type="date"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
            value={festivalDate}
            onChange={(e) => setFestivalDate(e.target.value)}
          />
        </div>

        <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2 mt-2">Festival Name</label>
          <input
            type="text"
            placeholder="Enter Festival Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
            value={festivalName}
            onChange={(e) => setFestivalName(e.target.value)}
          />
        </div>
        
        <div className="mb-4.5">
          <label className="block text-black dark:text-white mb-2 mt-2">Festival Title</label>
          <input
            type="text"
            placeholder="Enter Festival Title"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
            value={festivalTitle}
            onChange={(e) => setFestivalTitle(e.target.value)}
          />
        </div>

              <div className="mt-4 flex justify-end">
                <button type="submit" className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2">
                  Add Festival
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default FestivalList;
