import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

function UsersData() {
  const [usersData, setUsersData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState("");

  const getUsers = async () => {
    const { data } = await axios.get("/getUsers");
    console.log("hello");
    if (data.users.length > 0) {
      setUsersData(data.users);
    }
  };

  useEffect(() => {
    getUsers();
  }, [usersData]);

  const handleEdit = (user) => {
    setIsActive(true);
    setUser(user);
  };

  const handleDelete = async (id) => {
    const resp = await axios.delete(`/deleteUser/${id}`);
    console.log("DELETE RESPONSE:", resp);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              All Users
            </h1>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Email
                  </th>
                  <th className="px-7 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Edit
                  </th>
                  <th className="px-7 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Delete
                  </th>
                </tr>
              </thead>

              {usersData &&
                usersData.map((user, index) => (
                  <tbody key={index}>
                    <tr className="transition-all ease-in-out duration-200 hover:bg-gray-50 rounded-md">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <button
                          className="px-3 py-1 hover:text-green-500 rounded-md transition-all ease-in-out duration-200 active:scale-50 hover:bg-green-200"
                          onClick={() => {
                            handleEdit(user);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        <button
                          className="px-3 py-1 hover:text-red-500 rounded-md transition-all ease-in-out duration-200 active:scale-50 hover:bg-red-200"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </section>
      {isActive && <Modal user={user} setIsActive={setIsActive} />}
    </>
  );
}

export default UsersData;
