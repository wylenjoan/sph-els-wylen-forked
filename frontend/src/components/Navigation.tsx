import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { logoutUser } from "../apiClient/authService"
import routes from "../constants/routes"
import useAuth from "../hooks/useAuth"

function Navigation() {
  const { user } = useAuth()
  let defaultStyle = {
    textDecoration: "none",
    color: "gray"
  };
  let activeStyle = {
    textDecoration: "none",
    fontWeight: "bold"
  };

  const renderNav = user.is_admin ? (
    <Nav className="me-auto">
      <Nav.Item className="px-3">
        <NavLink
          to={routes.CATEGORY_LIST}
          style={({ isActive }) =>
            isActive ? activeStyle : defaultStyle
          }
        >
          Category List
        </NavLink>
      </Nav.Item>
      <Nav.Item className="px-3">
        <NavLink
          to={routes.ADD_CATEGORY}
          style={({ isActive }) =>
            isActive ? activeStyle : defaultStyle
          }
        >
          Add Category
        </NavLink>
      </Nav.Item>
      <Nav.Item className="px-3">
        <NavLink
          to={routes.USER_LIST}
          style={({ isActive }) =>
            isActive ? activeStyle : defaultStyle
          }
        >
          User List
        </NavLink>
      </Nav.Item>
    </Nav>
  ) : (
    <Nav className="me-auto">
      <Nav.Item className="px-3">
        <NavLink
          to={routes.CATEGORIES}
          style={({ isActive }) =>
            isActive ? activeStyle : defaultStyle
          }
        >
          Categories
        </NavLink>
      </Nav.Item>

    </Nav>
  )

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>ELS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          {renderNav}
          <Navbar.Text className="pe-4">
            Signed in as: {user.first_name} {user.last_name}
          </Navbar.Text>
          <Button variant="primary" type="submit" onClick={logoutUser}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation