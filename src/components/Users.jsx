import React, { useRef, useEffect, useState } from "react";
import axios from "axios";


function LastUpdate({ dt }) {
  const updatedAt = new Date(dt);
  const diffInMs = Date.now() - updatedAt.getTime();
  const diffInDays = Math.ceil(diffInMs / 60000 / (60 * 24));
  return diffInDays + "d";
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const formRef = useRef();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPage, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const url = `http://localhost:8000/api/users/showusers/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setUsers(result.data.users);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchVal]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      setError("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/users/addusers";
      await axios.post(url, form);
      setError("User added successfully");
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setError("");
    setForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditId(user._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = formRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `http://localhost:8000/api/users/${editId}`;
      await axios.patch(url, form);
      setError("User details modified successfully.");
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
    });
    setEditId(null);
    fetchUsers();
  };

  const handleSearch = () => {
    setPage(1);
    setTotalPages(1);
    fetchUsers();
  };
  return (
    <div>
      <div>
        <h2>User Management</h2>
        {error}
        <div>
          <form ref={formRef}>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              value={form.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="New Password"
              onChange={handleChange}
              required
            />
            <select
              name="role"
              value={form.role}
              required
              onChange={handleChange}
            >
              <option value="">--Select Role --</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {/* <input
              type="text"
              name="role"
              value={form.role}
              placeholder="Role"
              onChange={handleChange}
            /> */}
            {editId ? (
              <>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAdd}>Add</button>
            )}
          </form>
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <br />
        {loading}
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email address</th>
                <th>Role</th>
                <th>Updated</th>
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
                      <LastUpdate dt={user.updatedAt} />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            <tfoot></tfoot>
          </table>
          <br />
          <div>
            <button
              disabled={page === 1}
              onClick={() => setPage(Math.max(page - 1, 1))}
            >
              Previous
            </button>
            Page {page} of {totalPage}
            <button
              disabled={page === totalPage}
              onClick={() => setPage(Math.min(page + 1, totalPage))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

  

