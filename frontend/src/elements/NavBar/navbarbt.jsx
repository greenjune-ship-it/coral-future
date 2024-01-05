import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './navbar.css'
function NavBarbt() {
    return (
      <>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Link to='/' className="link-class">
              <Navbar.Brand >Navbar</Navbar.Brand>
            </Link>
            <Nav className="me-auto">
              <Nav.Link href="#map">Map</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#aboutus">About Us</Nav.Link>
              <Nav.Link href="#gethelp">Get Help</Nav.Link>
              </Nav>
              <Nav className="mr-auto">
              <Link to='/signin' className="link-class">
                  <Button variant="primary">Log In</Button>{' '}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </>
      
    );
  }
  
  export default NavBarbt;