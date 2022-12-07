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
  <Nav className="mr-auto">
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

// const Navbar = () => {
//     return (
//         <nav class="navbar">
//         <Link className="logo" to="/123">
//           <img src="https://henrymeds.com/wp-content/uploads/2022/02/Henry-Logo-Black.png" alt="Henry logo"></img>
//           </Link>
//         <ul class="nav-links">
//           <li class="nav-item"><Link to="/patients">Patients</Link></li>
//           <li class="nav-item"><Link to="/providers">Providers</Link></li>
//           <li class="nav-item"><Link to="/login">Login</Link></li>
//         </ul>
//       </nav>
//     )
// }

export default Header