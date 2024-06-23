import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmPassword: '',
    role: 'user' // Default role set to 'user'
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Send signup request with both password fields
    fetch('http://localhost:8080/api/auth/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        // Handle successful signup
        console.log('User signed up successfully');
        navigate("/login")
      } else {
        // Handle signup error
        console.error('Signup failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')"
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-[40px] text-center font-semibold text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 mb-8">
               
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-2 mt-2 placeholder-gray bg-white border border-gray rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="johnsnow@example.com" className="block w-full px-5 py-2 mt-2 placeholder-gray bg-white border border-gray rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="block w-full px-5 py-2 mt-2 placeholder-gray bg-white border border-gray rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="block w-full px-5 py-2 mt-2 placeholder-gray bg-white border border-gray rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue rounded-lg hover:bg-blue focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-500 py-2">Don't have an account yet?
                <a href="/login" className="font-semibold text-blue hover:underline focus:text-gray-800 focus:outline-none">Sign In</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
