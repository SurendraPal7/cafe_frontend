import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  // const API_URL = import.meta.env.VITE_API_URL;
  const fetchUsers = async () => {
    try {
const url ="http://localhost:8000/api/users/showusers";
      const result = await axios.get(url);
      setUsers(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
const url =`http://localhost:8000/api/users/${id}`;    
  const result = await axios.delete(url);
      setError("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <div>
        <h2>User Management</h2>
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email address</th>
                <th>Role</th>
         
                <th>Action</th>
              </tr>
            </thead>
            {users &&
              users.map((user) => (
                <tbody key={user._id}>
                  <tr>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}