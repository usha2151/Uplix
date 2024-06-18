import React, { useEffect, useState } from "react";
import DropDowns from "../../Common/DropDowns";
import axios from "axios";
import { useSelector } from "react-redux";

const cardData = [
  {
    type: "Clients",
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

const people = [{ name: "All " }, { name: "Active" }, { name: "Inactive" }];

const DashboardUser = () => {
  const [userClients, setUserClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);
  const [editClientId, setEditClientId] = useState(null);
  const [editedClient, setEditedClient] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const auth = useSelector((state) => state.auth);
  const userid = auth.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/userClients/clientsData/${userid}`);
        setUserClients(response.data.clients);
        console.log(response.data.clients);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    };
    fetchData();
  }, [userid]);

const toggleActive = async (id) => {
  try {
    const updatedClients = userClients.map((client) =>
      client.client_id === id ? { ...client, status: client.status === 1 ? 0 : 1 } : client
    );
    setUserClients(updatedClients);

    await axios.put(`http://localhost:8080/userClients/updateStatus/${id}`, {
      isActive: userClients.find((client) => client.client_id === id).status !== 1,
    });

    // fetchData(); // Refresh data after toggling
  } catch (error) {
    console.error("Error toggling active status:", error);
  }
};
  const handleEditClick = (client) => {
    setEditClientId(client.client_id);
    setEditedClient(client);
    setEditModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient({ ...editedClient, [name]: value });
  };
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8080/userClients/updateClient/${editClientId}`, editedClient);
      setUserClients((clients) =>
        clients.map((client) => (client.client_id === editClientId ? editedClient : client))
      );
      setEditClientId(null);
      setEditModalIsOpen(false);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setModalIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/userClients/deleteClient/${clientToDelete.client_id}`);
      setUserClients((clients) =>
        clients.filter((client) => client.client_id !== clientToDelete.client_id)
      );
      setModalIsOpen(false);
      setClientToDelete(null);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };
  const handleCancelDelete = () => {
    setModalIsOpen(false);
    setClientToDelete(null);
  };

  const handleCancelEdit = () => {
    setEditModalIsOpen(false);
    setEditClientId(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = userClients.filter(user => 
    user.first_name && user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredUsers.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredUsers.length / clientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full py-3 pl-7 pr-5 grid xl:grid-cols-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-start">
      {cardData?.map((data, key) => (
        <div
          className="p-5 xl:col-span-3 bg-white flex flex-col 2xl:max-w-none w-full rounded-xl gap-2 border border-[#E7E7E7] hover:shadow-xl cursor-pointer"
          key={key}
        >
          <div className="flex justify-between">
            <span className="text-[#637381] text-sm font-medium">{data?.type}</span>
            <div className="flex gap-1 items-center">
              <span className="">{data?.percentage}</span>
              <img src={data?.arrow} alt="arrow" />
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <span className="text-2xl font-bold whitespace-nowrap">{userClients ? userClients.length : ''}</span>
            <img src={data?.graph} alt="graph" />
          </div>
        </div>
      ))}

      <div className="p-3 bg-white flex flex-col xl:col-span-12 xl:row-auto lg:row-start-4 rounded-xl border border-[#E7E7E7]">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <div className="lg:max-w-sm w-2/5 lg:w-full border focus-within:border-blue-600 rounded-lg border-[#E7E7E7] py-1 px-4 justify-between items-center max-h-12 hidden md:flex">
            <input type="text"  value={searchQuery} onChange={handleSearch} className="outline-none w-9/12" placeholder="Search..." />
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
      
          <DropDowns list={people} />
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
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
        
                <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap">
                  First Name
                </th>
                <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                  Last Name
                </th>
                <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap">
                  Email Id
                </th>
                <th className="py-3 text-[#212B36] text-sm font-normal whitespace-nowrap text-center">
                  Status
                </th>
                <th className="py-3 pl-1 text-[#212B36] text-sm font-normal whitespace-nowrap rounded-r-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {currentClients.length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-4 text-sm text-gray-500">
        No records found.
      </td>
    </tr>
  ) : (
    currentClients.map((client, index) => (
      <tr
        key={client.client_id}
        className="drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] bg-[#f6f8fa] hover:shadow-2xl cursor-pointer"
      >
        <td className="py-4 pl-3 text-sm font-normal text-[#637381] rounded-l-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </td>
      
        <td className="py-2 pl-1 text-sm font-normal text-[#637381]">
          {client.first_name}
        </td>
        <td className="py-2 text-sm font-normal text-[#637381]">{client.last_name}</td>
        <td className="py-2 text-sm font-normal text-[#637381]">{client.email}</td>
        <td className="py-2 text-sm font-normal text-[#637381] text-center">
<button
className={`py-2 px-4 rounded ${client.status === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
onClick={() => toggleActive(client.client_id)}
>
{client.status === 1 ? 'Active' : 'Inactive'}
</button>
          <button
            onClick={() => toggleActive(client.client_id)}
            className={`relative inline-flex items-center rounded-full border border-gray-300 w-10 h-6 transition-colors focus:outline-none ${
              client.status == 1 ? "bg-green" : "bg-gray"
            }`}
          >
            <span
              className={`absolute left-0 inline-block w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ease-in-out ${
                client.status == 1 ? "translate-x-full" : "translate-x-0"
              }`}
            ></span>
            <span
              className={`absolute inset-y-0 left-0 flex items-center justify-center w-8 h-8 rounded-full transition-transform ease-in-out transform ${
                client.status == 1 ? "translate-x-8" : "translate-x-0"
              }`}
            ></span>
          </button>
        </td>
        <td className="py-4 pl-1 text-sm font-normal text-[#637381] rounded-r-[8px] flex gap-3">
          <i className="fa-solid fa-user-pen" onClick={() => handleEditClick(client)}></i>
          <i className="fa-solid fa-trash" onClick={() => handleDeleteClick(client)}></i>
        </td>
      </tr>
    ))
            )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      {modalIsOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-dark bg-opacity-50 z-50 p-8">
          <div
            className="p-5 rounded-lg relative bg-dimwhite"
            style={{ width: "70vw", maxWidth: "350px", height: "auto", padding: "20px" }}
          >
            <h2>Are you sure you want to delete this user?</h2>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={handleCancelDelete} className="px-4 py-2 bg-gray rounded">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for edit user details */}
      {editModalIsOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-dark bg-opacity-50 z-50 p-8">
          <div
            className="p-5 rounded-lg relative bg-dimwhite"
            style={{ width: "70vw", maxWidth: "350px", height: "auto", padding: "20px" }}
          >
            <h2>Edit User Details</h2>
            <div className="flex flex-col gap-3 mt-4">
              <input
                type="text"
                name="first_name"
                value={editedClient.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="last_name"
                value={editedClient.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                value={editedClient.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray rounded">
                Cancel
              </button>
              <button onClick={handleSaveClick} className="px-4 py-2 bg-blue text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;