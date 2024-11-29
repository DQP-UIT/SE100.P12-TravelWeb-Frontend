import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import AdminHeader from "../header/AdminHeader";

const AdminSet = () => {
  const fakeUser = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
  };
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminSet;
