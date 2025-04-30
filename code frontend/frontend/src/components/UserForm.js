import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/users", { name, email })
            .then(() => {
                setName("");
                setEmail("");
                alert("User added!");
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;
