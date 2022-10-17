import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { logoutUser } from "../apiClient/authService";
import routes from "../constants/routes";
import useAuth from "../hooks/useAuth";
import NavItem from "./NavItem";

function Navigation() {
  const { user } = useAuth();

  const renderNav = user.is_admin ? (
    <Nav className="me-auto">
      <NavItem
        route={routes.CATEGORY_LIST}
        label="Category List"
      />
      <NavItem
        route={routes.ADD_CATEGORY}
        label="Add Category"
      />
      <NavItem
        route={routes.USER_LIST}
        label="User List"
      />
    </Nav>
  ) : (
    <Nav className="me-auto">
      <NavItem
        route={routes.DASHBOARD}
        label="Dashboard"
      />
      <NavItem
        route={`${routes.PROFILE}?user=${user.id}`}
        label="Profile"
      />
      <NavItem
        route={routes.EDIT_PROFILE}
        label="Edit Profile"
      />
      <NavItem
        route={routes.CATEGORIES}
        label="Categories"
      />
      <NavItem
        route={routes.WORDS_LEARNED}
        label="Words Learned"
      />
    </Nav>
  );

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
  );
}

export default Navigation;
