import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

function User() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  )
}

export default User
