import { Routes, Route,BrowserRouter, Router } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}  />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
    </Routes>
    </>
  );
}

export default App;