import React, { use, useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [limit, setLimit] = useState(3);
  const [form,setForm]=useState({
    fistname:"",
    lastname:"",
    email:"",
    password:"",
    role:""
  })
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
  }, [page, searchVal]); // Fetch on page or search change

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8000/api/users/${id}`;
      await axios.delete(url);
      setError("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleAdd=()=>{
    try{

   
    const url ="http://localhost:8000/api/users/register";
    const result=axios.post(url,form)
     }
     catch(err){
      console.log(err);
      setError("something went wrong")
     
      }


  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div>
      <h2>User Management</h2>

      <div>
        <input name="firstname" value={form.fistname} onChange={handleChange} type="text" placeholder="First name" />
        <input  name="lastname" value={form.lastname} onChange={handleChange}
        type="text" placeholder="Last name" />
       
        <input onChange={handleChange} value={form.email} name="email" type="text" placeholder="Email" />
      
        <input onChange={handleChange} value={form.password } name="password" type="password" placeholder="Password" />
        <input onChange={handleChange} value={form.role} name="role" type="text" placeholder="Role" />
        <button>Add</button>
      </div>

      <div>
        <input type="text" placeholder="Search by first name" onChange={(e)=>setSearchVal(e.target.value)} />
      <button onClick={()=>fetchUsers()}>search</button>
      </div>
      

      

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
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        &nbsp; Page {page} of {totalPage} &nbsp;
        <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>
          Next
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
