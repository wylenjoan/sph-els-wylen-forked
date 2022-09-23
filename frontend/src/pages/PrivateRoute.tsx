import { Navigate, useLocation } from "react-router-dom";
import routes from "../constants/routes";
import useAuth from "../hooks/useAuth"
import Admin from "./Admin";
import User from "./User";
import { sessionCookie } from "../cookieStorage";
import { useEffect } from "react";
import { logoutUser } from "../apiClient/authService";

function PrivateRoute() {
  const { user, setUser } = useAuth();
  const loggedInUser = localStorage.getItem('user');
  const location = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      logoutUser();
      window.location.reload()
    }
  }, [loggedInUser, setUser])

  if (loggedInUser && sessionCookie)
    return user.is_admin ? <Admin /> : <User />
  else
    return <Navigate to={routes.LOGIN} state={{ from: location }} replace />
}

export default PrivateRoute
