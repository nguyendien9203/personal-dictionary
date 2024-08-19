import { Navbar, Nav } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { NAV_LINKS } from "../constants/navigation";
import logo from "../assets/images/logo.png";
import { Button } from "react-bootstrap";

const Header = () => {
  const location = useLocation();

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
          {NAV_LINKS.map((link) => {
            return (
              <Nav.Link
                key={link.id}
                to={link.url}
                active={location.pathname === `/${link.url}`}
              >
                {link.title}
              </Nav.Link>
            );
          })}
        </Nav>
        <Button as={Link} href="/login" variant="primary">
          Login
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};


export default Header;
