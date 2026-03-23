import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Save user in localStorage (temporary database)
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account Created Successfully ✅");

    // Redirect to login
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account ✨</h2>
        <p>Signup to get started</p>

        <form onSubmit={handleSignup} autoComplete="off">
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            name="new_email"
            autoComplete="new-email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            name="new_password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;