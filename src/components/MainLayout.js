import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* Push content below fixed navbar */}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;