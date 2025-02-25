import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar/>} {/* Faqat login sahifasida Navbarni yashirish */}
      <Outlet /> {/* Nested route-larni ko'rsatish uchun */}
    </>
  );
};

export default App;
