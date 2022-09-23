import { Button } from 'react-bootstrap'
import { logoutUser } from '../apiClient/authService'

function User() {
  return (
    <div>
      User
      <Button variant="primary" type="submit" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  )
}

export default User
