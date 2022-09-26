import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function Admin() {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>

  )
}

export default Admin
