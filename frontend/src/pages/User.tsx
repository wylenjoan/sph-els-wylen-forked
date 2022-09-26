import { Button } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { logoutUser } from '../apiClient/authService'

function User() {
  return (
    <div>
      User
      <Button variant="primary" type="submit" onClick={logoutUser}>
        Logout
      </Button>
      <Outlet />
    </div>
  )
}

export default User
