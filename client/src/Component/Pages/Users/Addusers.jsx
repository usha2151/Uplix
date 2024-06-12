import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AddUsers() {
  const auth = useSelector((state) => state.auth);
  const userLogginId = auth.role === 'user' ? auth.id : null;
  console.log(userLogginId);
  console.log(auth);

  const [users, setUsers] = useState([{ firstName: '', lastName: '', email: '' }]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({ users: [], file: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddUser = () => {
    setUsers([...users, { firstName: '', lastName: '', email: '' }]);
    setErrors({ ...errors, users: [...errors.users, { firstName: '', lastName: '', email: '' }] });
  };

  const handleCancelUser = (index) => {
    const newUsers = [...users];
    const newErrors = [...errors.users];
    newUsers.splice(index, 1);
    newErrors.splice(index, 1);
    setUsers(newUsers);
    setErrors({ ...errors, users: newErrors });
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrors({ ...errors, file: '' });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { users: [], file: '' };

    const isAnyUserFilled = users.some(user => user.firstName && user.lastName && user.email);

    if (!file && !isAnyUserFilled) {
      newErrors.file = 'Please add either the user details or upload a file';
      formIsValid = false;
    }

    if (isAnyUserFilled) {
      users.forEach((user, index) => {
        const userErrors = { firstName: '', lastName: '', email: '' };
        if (!user.firstName) {
          userErrors.firstName = 'First name is required';
          formIsValid = false;
        }
        if (!user.lastName) {
          userErrors.lastName = 'Last name is required';
          formIsValid = false;
        }
        if (!user.email) {
          userErrors.email = 'Email is required';
          formIsValid = false;
        }
        newErrors.users[index] = userErrors;
      });
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      const isAnyUserFilled = users.some(user => user.firstName && user.lastName && user.email);

      if (isAnyUserFilled) {
        formData.append('userData', JSON.stringify(users));
        formData.append('userId', userLogginId);
      }
      if (file) {
        formData.append('clients', file);
        formData.append('userId', userLogginId);
      }

      await axios.post('http://localhost:8080/userClients/user-clients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        // Handle successful response
        setSuccessMessage('Data inserted successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Hide after 3 seconds

        // Reset form fields and file input
        setUsers([{ firstName: '', lastName: '', email: '' }]);
        setFile(null);
        setErrors({ users: [], file: '' });
        console.log(res.data.message);
      }).catch((err) => {
        // Handle error response
        console.log(err);
      });
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white p-5 rounded-lg relative" style={{ width: '50vw', maxWidth: '650px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
        <form onSubmit={handleSave}>
          {users.map((user, index) => (
            <div key={index} className="mb-4.5">
              <div className={`mb-4.5 gap-4 xl:flex ${index === 0 ? 'mb-2' : ''}`}>
                <div className="w-full xl:w-full">
                  <label className="mb-2.5 block text-black dark:text-white">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    placeholder="Enter your first name"
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.users[index]?.firstName && <p className="text-red-500">{errors.users[index].firstName}</p>}
                </div>
                <div className="w-full xl:w-full">
                  <label className="mb-2.5 block text-black dark:text-white">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    placeholder="Enter your last name"
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.users[index]?.lastName && <p className="text-red-500">{errors.users[index].lastName}</p>}
                </div>
                <div className="w-full xl:w-full">
                  <label className="mb-2.5 block text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Enter your email address"
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.users[index]?.email && <p className="text-red-500">{errors.users[index].email}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => handleCancelUser(index)}
                  className="inline-flex justify-center items-center mt-8 rounded-md border border-transparent bg-red py-2 px-4 text-sm text-white font-medium h-8"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={handleAddUser} className="inline-flex justify-center rounded-md border border-transparent bg-green py-2 px-4 text-sm text-white font-medium bg-blue-500">
              <i className="fa-solid fa-user-plus mr-1 mt-1"></i>Add Users
            </button>
          </div>

          <p className="text-center">OR</p>
          <div className="w-full mt-2">
            <label className="mb-2.5 block text-black dark:text-white">Upload Client List</label>
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            <p className="mt-2 text-sm text-gray-600">Note: The file should contain only the following fields: firstname, lastname, email</p>
            {errors.file && <p className="text-red-500">{errors.file}</p>}
          </div>

          {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}

          <div className="mt-4 flex justify-end">
            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue text-white py-2 px-4 text-sm text-black font-medium bg-blue-500">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUsers;
