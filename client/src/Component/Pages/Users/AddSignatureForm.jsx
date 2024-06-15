import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddSignatureForm = () => {
  const auth = useSelector((state) => state.auth);
  const userid = auth.id;


  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    phone: "",
    email: "",
    company: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    website: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch existing data for the user if it exists
    axios.get(`http://localhost:8080/signature/getsignature/${userid}`).then((response) => {
      if (response) {
        setFormData(response.data);
        console.log(response.data);
      }
    });
  }, [userid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/signature/addsignature", { ...formData, userId: userid })
      .then(() => {
        setMessage("Signature added successfully!");
        setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
      })
      .catch((error) => {
        console.error("There was an error adding the signature!", error);
      });
  };

  return (
    <div className="px-16 py-8">
      <div className="w-full bg-white rounded-lg shadow-md px-8 py-6 border border-gray">
        <h2 className="text-fs4 font-semibold text-blue mb-1">
          Add Signature
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-1">
            <label htmlFor="name" className="block font-semibold mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray rounded-md"
              placeholder="name"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="designation" className="block font-semibold mb-1">
              Designation:
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray rounded-md"
              placeholder="designation"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="phone" className="block font-semibold mb-1">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray rounded-md"
              placeholder="phone"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray rounded-md"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="company" className="block font-semibold mb-1">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              placeholder="Enter company"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray rounded-md"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="street" className="block font-semibold mb-1">
              Street:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray rounded-md"
              placeholder="Enter street"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="city" className="block font-semibold mb-1">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-3 py-2 border border-gray rounded-md"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="zip" className="block font-semibold mb-1">
              Zip Code:
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Enter zip"
              className="w-full px-3 py-2 border border-gray rounded-md"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="country" className="block font-semibold mb-1">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full px-3 py-2 border border-gray rounded-md"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="website" className="block font-semibold mb-1">
              Website:
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website"
              className="w-full px-3 py-2 border border-gray rounded-md"
              required
            />
          </div>
          <div className="mt-6 flex justify-end mx-auto">
            <button
              type="submit"
              className="py-2 px-4 bg-blue text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
        {message && <div className="text-green mb-4">{message}</div>}

      </div>
    </div>
  );
};

export default AddSignatureForm;
