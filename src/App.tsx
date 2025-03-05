import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true }); 
    } else {
      navigate("/dashboard", { replace: true }); 
    }
  }, []);

  return (
    <div>
      {!isLoginPage && <Navbar />} 
      <Outlet />
    </div>
  );
};

export default App;
