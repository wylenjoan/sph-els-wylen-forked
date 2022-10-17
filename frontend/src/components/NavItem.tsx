import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface Props {
  route: string,
  label: string,
}

function NavItem(props: Props) {
  const { route, label } = props;

  let defaultStyle = {
    textDecoration: "none",
    color: "gray"
  };
  let activeStyle = {
    textDecoration: "none",
    fontWeight: "bold"
  };

  return (
    <Nav.Item className="px-3">
      <NavLink
        to={route}
        style={({ isActive }) =>
          isActive ? activeStyle : defaultStyle
        }
      >
        {label}
      </NavLink>
    </Nav.Item>
  );
}

export default NavItem;
