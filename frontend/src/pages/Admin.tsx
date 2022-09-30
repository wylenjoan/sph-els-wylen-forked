import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function Admin() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>

  )
}

export default Admin
