import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pendingFestival } from '../../../redux/actions/action';
import axios from 'axios';

const RequestFestival = () => {
  const dispatch = useDispatch();
  const [festivals, setFestivals] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(pendingFestival());
  }, [dispatch]);

  const requestFestivals = useSelector(state => state.festivalRequestReducer.pendingNotifications);

  useEffect(() => {
    setFestivals(requestFestivals);
  }, [requestFestivals]);

  const handleApprove = (festivalId) => {
    updateStatus(festivalId, 2);
  };

  const handleReject = (festivalId) => {
    updateStatus(festivalId, 3);
  };

  const updateStatus = async (festivalId, statusId) => {
    try {
      const response = await axios.put('http://localhost:8080/festivals/statusChange', { festivalId, statusId });

      dispatch(pendingFestival());

      if (response.status === 200) {
        setAlertMessage('Festival status updated successfully!');
        setAlertType('success');
        setTimeout(() => {
          setAlertMessage('');
          setAlertType('');
        }, 3000);
      } else {
        setAlertMessage('Failed to update festival status!');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setAlertMessage('Error updating status!');
      setAlertType('error');
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderFestivals = () => {
    if (festivals.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">
            No record found
          </td>
        </tr>
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFestivals = festivals.slice(startIndex, startIndex + itemsPerPage);

    return currentFestivals.map((festival) => (
      <tr key={festival.festival_id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{festival.festival_name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{festival.festival_date}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{festival.festival_title}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => handleApprove(festival.festival_id)}
            className="bg-green text-white px-4 py-2 rounded-md mr-2"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(festival.festival_id)}
            className="bg-red text-white px-4 py-2 rounded-md"
          >
            Reject
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className='d-flex justify-center'>
        <div className="overflow-x-auto py-20 px-40">
          {alertMessage && (
            <div className={`alert ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md mb-4`}>
              {alertMessage}
            </div>
          )}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Festival Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Festival Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Festival Title
                </th>
                <th scope="col" className="relative px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderFestivals()}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= festivals.length}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestFestival;
