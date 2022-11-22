import React, { useState } from "react";
import axios from "axios";

function Modal({ user, setIsActive }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const updateUser = async () => {
    if (!(userName || userEmail)) {
      return alert("Name or Email is missing");
    }
    const data = {
      name: userName,
      email: userEmail,
    };
    const res = await axios.put(`/editUser/${user._id}`, data);
    console.log(res);

    setIsActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
    setUserEmail("");
    setUserName("");
  };

  return (
    <div
      className="overflow-hidden h-full w-full fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.15)] flex justify-center items-center"
      id="modal"
    >
      <div className="p-6 rounded-md shadow-lg shadow-[rgba(0,0,0,0.32)] dark:bg-gray-900 dark:text-gray-100">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-4 px-5 py-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
              Update User
            </h1>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="rounded text-base outline-none text-gray-700 py-1 px-3 leading-8"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className=" rounded text-base outline-none text-gray-700 py-1 px-3 leading-8"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                />
              </div>
            </div>

            <div className="w-full flex flex-col justify-center gap-3 mt-6 sm:flex-row">
              <button
                className="px-6 py-2 rounded-sm transition-all ease-out duration-200 hover:bg-gray-800 active:scale-50"
                onClick={() => setIsActive(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-sm shadow-sm transition-all ease-out duration-200 dark:bg-violet-600 dark:text-white hover:bg-violet-400 active:scale-50"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
