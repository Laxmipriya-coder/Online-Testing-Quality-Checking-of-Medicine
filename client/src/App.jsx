import { Routes, Route,BrowserRouter, Router } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
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
    <Footer/>
    </>
  );
}

export default App;