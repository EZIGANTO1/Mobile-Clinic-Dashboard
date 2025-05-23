import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:2025/api/user/admin/addnew",
        {
          firstName,
          lastName,
          email,
          phoneNumber, // Ensure correct variable usage
          nic,
          dob,
          gender,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Admin added successfully!");
      setIsAuthenticated(true);
      navigateTo("/");

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.jpg" alt="logo" className="logo" style={{ width: "80px" }} />
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleAddNewAdmin}>
          <div>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" placeholder="Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} />
            <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
