import { Routes, Route,BrowserRouter, Router } from "react-router-dom";
import{ useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ScanPage from "./pages/ScanPage";
import ConsumableDetails from "./pages/ConsumableDetails";
import SearchResults from "./pages/SearchResults";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <Routes>
      <Route path="/" element={<HomePage />}  />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/report" element={<h1>Report Page</h1>} />
      <Route path="/consumable/:id" element={<ConsumableDetails />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
    <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}

export default App;