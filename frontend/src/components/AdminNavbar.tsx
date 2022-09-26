import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { logoutUser } from "../apiClient/authService"
import routes from "../constants/routes"

function AdminNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">ELS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={routes.CATEGORY_LIST}>
              Categories
            </Nav.Link>
            <Nav.Link href={routes.USER_LIST}>
              Users
            </Nav.Link>
          </Nav>

          <Button variant="primary" type="submit" onClick={logoutUser}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNavbar
