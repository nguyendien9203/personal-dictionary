import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { NAV_LINKS } from "../constants/navigation";
import logo from "../assets/images/logo.png";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const role = user?.role || 'member';

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          alt="Personal Dictionary"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <span>Personal Dictionary</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {NAV_LINKS[role].map((link) => {
            return (
              <Nav.Link
                key={link.id}
                as={Link}
                to={link.url}
                active={location.pathname === link.url}
              >
                {link.title}
              </Nav.Link>
            );
          })}
        </Nav>
        {user ? (
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Hello, {user.username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button as={Link} to="/login" variant="primary">
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
