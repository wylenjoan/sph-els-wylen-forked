import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './constants/routes';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Admin from './pages/Admin';
import AdminDashboard from './pages/admin/AdminDashboard';
import User from './pages/User';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.REGISTRATION} element={<Registration />} />
        <Route path={routes.LOGIN} element={<Login />} />

        <Route path={routes.ROOT} element={<PrivateRoute />}>
          <Route element={<Admin />} >
            <Route path='' element={<AdminDashboard />} />
          </Route>

          <Route path={routes.USER} element={<User />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
