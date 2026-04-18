import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // 🔵 validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("Signup response:", data); // 👈 debugging

      if (!res.ok) {
        alert(data.message || "Signup failed ❌");
        setLoading(false);
        return;
      }

      alert("Signup Successful ✅");

      // clear form
      setEmail("");
      setPassword("");

      // redirect
      navigate("/login");

    } catch (err) {
      console.log("Signup Error:", err);
      alert("Server not running or backend issue ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account 🚀</h2>
        <p>Signup to continue</p>

        <form onSubmit={handleSignup} autoComplete="off">

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignupPage;