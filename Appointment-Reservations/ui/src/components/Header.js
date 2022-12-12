import {Link} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './Header.css';

const Header = () => {
  return (
      <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
<Navbar.Brand><img id="logo" src="https://henrymeds.com/wp-content/uploads/2022/02/Henry-Logo-Black.png" alt="Henry logo"></img></Navbar.Brand>
</LinkContainer>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="ms-auto">
    <LinkContainer to="/patients">
      <Nav.Link>Patients</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/providers">
      <Nav.Link>Providers</Nav.Link>
    </LinkContainer>
  </Nav>
</Navbar.Collapse>
</Navbar>
  )
}

export default Header