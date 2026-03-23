import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Get user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Check user exists
  if (!storedUser) {
    alert("No user found. Please signup first!");
    return;
  }

  // Check email & password match
  if (email === storedUser.email && password === storedUser.password) {
    alert("Login Successful ✅");
    navigate("/dashboard");
  } else {
    alert("Invalid Email or Password ❌");
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit} autoComplete="off">
  <input
    type="email"
    placeholder="Enter your Email"
    value={email}
    autoComplete="off"
    name="email"
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Enter your Password"
    value={password}
    autoComplete="new-password"
    name="password"
    onChange={(e) => setPassword(e.target.value)}
  />

  <button type="submit">Login</button>
 
<p>
  Don't have an account?{" "}
  <span 
    onClick={() => navigate("/signup")} 
    style={{ color: "blue", cursor: "pointer" }}
  >
    Sign up
  </span>
</p>
</form>
      </div>
    </div>
  );
};

export default LoginPage; 