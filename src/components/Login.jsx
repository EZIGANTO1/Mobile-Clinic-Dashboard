import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [loading, setLoading] = useState(false);

  
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    const api = "http://localhost:2025/api/user/user/login";

    try {
      const { data } = await axios.post(api, {
        email,
        password,
        role: role || "Admin", 
      }, { withCredentials: true });

      console.log("Login successful", data);

      // Update auth state if your Context expects it
      setIsAuthenticated(true);
      localStorage.setItem("auth", "true");


      toast.success("Login successful!");
      setTimeout(() => navigateTo("/"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.response?.data?.message || "Login failed.");
      toast.error(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/logo.jpg" alt="logo" className="logo" style={{width: '100px'}} />
        <h1 className="form-title">WELCOME TO MEDITECH MOBILE CLINIC</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
  <input 
  type="text" 
  placeholder="Email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
  />
  <input 
  type="password" 
  placeholder="Password" 
  value={password} 
  onChange={(e) => setPassword(e.target.value)} 
  />
  <div style={{ justifyContent: "center", alignItems: "center" }}>
    <button type="submit" disabled={loading}>
      {loading ? "Logging in..." : "Login"}
    </button>
  </div>
</form>
{error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </section>
    </>
  );
};

export default Login;