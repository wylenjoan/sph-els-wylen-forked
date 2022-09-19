import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import routes from './constants/routes';


function App() {
  return (
    <div className="App">
      Hello! The current routes are: <br />
      <ul>
        <li>
          <Link to={routes.ROOT}>Root</Link>
        </li>
        <li>
          <Link to={routes.REGISTRATION}>Registration</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
