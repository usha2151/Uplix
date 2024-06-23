import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function AddEmails() {
  const [SmtpUserName, setsmtpUserName] = useState("");
  const [SmtpPassword, setSmtpPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const auth = useSelector((state) => state.auth);
  

  // Clear success message after a few seconds
  useEffect(() => {
    if (messageType === 'success') {
      const timer = setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messageType]);

  // If user adds SMTP details
  const handleSubmitSmtp = async (e) => {
    e.preventDefault();
    if (!SmtpPassword || !SmtpUserName) {
      setMessage('Add SMTP details first!');
      setMessageType('error');
    } else {
      try {
        // Send data to Node.js server using Axios
        const response = await axios.post('http://localhost:8080/SMTP/smtp-add', {
          userId: auth.id,
          SmtpUserName,
          SmtpPassword,
        });

        setMessage(response.data.message); // Display the server message
        if (response.data.success) {
          setMessageType('success');
          console.log('SMTP email added successfully');
        } else {
          setMessageType('error');
        }
      } catch (error) {
        // Handle error
        console.error('Error adding SMTP email:', error);
        setMessage(error.response?.data?.message || 'Error adding SMTP email');
        setMessageType('error');
      }
    }
  };

  return (
    <div className='p-16'>
      <div className="flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg w-full border border-gray">
          
          <form onSubmit={handleSubmitSmtp} className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">SMTP User Email:</label>
              <input type="text" onChange={(e) => setsmtpUserName(e.target.value)} id="username" name="username" className="mt-1 p-2 border border-gray rounded-md w-full" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">SMTP Password:</label>
              <input type="password" onChange={(e) => setSmtpPassword(e.target.value)} id="password" name="password" className="mt-1 p-2 border border-gray rounded-md w-full" required />
            </div>
            <div className="flex justify-end col-span-2">
              <button type="submit" className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm text-white font-medium bg-blue">Save</button>
            </div>
          </form>
          {message && (
            <div className={`mb-4 p-3 rounded ${messageType === 'success' ? 'text-green' : ' text-red'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEmails;
