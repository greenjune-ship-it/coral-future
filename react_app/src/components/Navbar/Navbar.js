// External imports
import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Internal imports
// Contexts
import { AuthContext } from 'contexts/AuthContext'

// Temporary helper function, need to find more elegant solution
function extractDomain(url) {
  const elem = document.createElement('a');
  elem.href = url;
  return elem.hostname;
}

const NavigationBar = () => {

  const { authData } = useContext(AuthContext);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href={backendUrl}>
          <i className="bi bi-house-door"></i> Coral Future
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="navbar-nav">
            <Nav.Item>
              <Nav.Link href={`${extractDomain(backendUrl)}:3000/map`}>
                <i className="bi bi-map"></i> Map
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href={`${backendUrl}/projects`}>
                <i className="bi bi-folder"></i> Projects
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="https://www.biologie.uni-konstanz.de/voolstra/">
                <i className="bi bi-person"></i> About Us
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="https://github.com/greenjune-ship-it/coral-future/issues">
                <i className="bi bi-question-circle"></i> Get Help
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

        <div className="ms-lg-4">
          {authData.authenticated ? (
            <NavDropdown title={<>{authData.username} <i className="bi bi-person-circle"></i></>} id="basic-nav-dropdown">
              <NavDropdown.Item href="/cart">
                <i className="bi bi-cart"></i> Cart
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`${backendUrl}/api/auth/logout/`}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Item>
              <Nav.Link href={`${backendUrl}/api/auth/login/`} className="default-link" style={{ color: '#0a58ca' }}>
                <i className="bi bi-box-arrow-in-right"></i> Login
              </Nav.Link>
            </Nav.Item>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
