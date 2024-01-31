import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const NavigationBar = ({ authStatus }) => {
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
              <Nav.Link href="https://coralfuture.org:3000">
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
          {authStatus.authenticated && authStatus.username ? (
            <div className="d-flex align-items-center">
              <span className="me-2 text-dark">Welcome, {authStatus.username}!</span>
              <form action={`${backendUrl}/user/logout`} method="post">
                <Button type="submit" variant="link" className="nav-link default-link" style={{ color: '#0a58ca' }}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Button>
              </form>
            </div>
          ) : (
            <Nav.Item>
              <Nav.Link href={`${backendUrl}/user/login`} className="default-link" style={{ color: '#0a58ca' }}>
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
