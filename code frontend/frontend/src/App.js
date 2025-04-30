import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    const newUser = { ...form, id: Date.now() };
    setUsers([...users, newUser]);
    setForm({ id: null, name: "", email: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditing(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map((user) => (user.id === form.id ? form : user)));
    setForm({ id: null, name: "", email: "" });
    setIsEditing(false);
  };

  return (
    <div className="App">
      <h2>{isEditing ? "Update User" : "Add User"}</h2>
      <form onSubmit={isEditing ? handleUpdateUser : handleAddUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <h3>User List</h3>
      {users.length === 0 ? (
        <p>No users added yet.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
