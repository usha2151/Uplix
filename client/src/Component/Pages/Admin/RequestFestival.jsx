import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FestivalPending } from '../../../redux/actions/actions';
import axios from 'axios';

const RequestFestival = () => {
   
        const dispatch = useDispatch();
        const [festivals, setFestivals] = useState([]);
      
        useEffect(() => {
          // Dispatch FestivalPending action to fetch festivals data
          dispatch(FestivalPending());
        }, [dispatch]);
      
        // Access festivals data from the store
        const requestFestivals = useSelector(state => state.festivalPendingReducer.pendingNotifications);
      
        // Update the local state with festivals data
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
      
              dispatch(FestivalPending());
       
              if (response.status === 200) {
                alert("Festival status updated successfully!");
              } else {
                alert("Failed to update festival status!");
              }
            } catch (error) {
              console.error('Error updating status:', error);
            }
        };
  return (
    <>

    <div className='d-flex justify-center'>
      <div className="overflow-x-auto py-20 px-40">
        <table className="min-w-50 divide-y divide-gray-200">
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
            {festivals.map((festival) => (
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
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(festival.festival_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

export default RequestFestival;