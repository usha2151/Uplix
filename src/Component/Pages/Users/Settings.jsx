import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setAvatar(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formData);
      if (response.status === 200) {
        console.log("You have Updated successfully");
        alert("You have Updated successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const fileInputRef = React.createRef();

  return (
    <main className="container mx-auto ">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 sm:rounded-lg shadow-xl max-w-3xl mx-auto">
          <div className="grid mx-auto mt-8 ">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                {avatarPreview ? (
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={avatarPreview}
                    alt="Avatar Preview"
                  />
                ) : (
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Default Avatar"
                  />
                )}

                <div className="grid grid-cols-1 gap-4 sm:ml-8">
                  <h2 className="text-2xl font-bold sm:text-3xl ">
                    Update your profile
                  </h2>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="py-1.5 px-4 text-base font-medium transition duration-300 focus:outline-none bg-green rounded-lg border border-gray hover:bg-blue focus:z-10 text-white"
                    >
                      Change avatar
                    </button>
                    <button
                      type="button"
                      onClick={handleImageDelete}
                      className="py-1.5 px-3 text-base font-medium transition duration-300 focus:outline-none bg-white rounded-lg border border-gray hover:bg-blue hover:text-white focus:z-10"
                    >
                      Delete avatar
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  <p>JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-10">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                      className="border border-gray text-sm rounded-lg focus:ring-green focus:border-blue block w-full p-2.5"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                      className="border border-gray text-sm rounded-lg focus:ring-green focus:border-blue block w-full p-2.5"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={values.username}
                      onChange={(e) =>
                        setValues({ ...values, username: e.target.value })
                      }
                      className="border border-gray text-sm rounded-lg focus:ring-green focus:border-blue block w-full p-2.5"
                      placeholder="Your username"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      Profession
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={values.profession}
                      onChange={(e) =>
                        setValues({ ...values, profession: e.target.value })
                      }
                      className="border border-gray text-sm rounded-lg focus:ring-green focus:border-blue block w-full p-2.5"
                      placeholder="Your profession"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                      className="border border-gray text-sm rounded-lg focus:ring-green focus:border-blue block w-full p-2.5"
                      placeholder="Your password"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={(e) =>
                        setValues({ ...values, confirmPassword: e.target.value })
                      }
                      className="border border-gray text-sm rounded-lg focus:ring-green focus:border-blue block w-full p-2.5"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="bio"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-gray focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Write your bio here..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-green transition duration-300 hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;