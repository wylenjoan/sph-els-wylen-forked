import { Button } from "react-bootstrap";
import { logoutUser } from "../apiClient/authService";

function Admin() {
  return (
    <div>
      Admin
      <Button variant="primary" type="submit" onClick={logoutUser}>
        Logout
      </Button>
    </div>

  )
}

export default Admin
