import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavigationBar = ({ authStatus }) => {
  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <i className="bi bi-house-door"></i> Coral Future
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="navbar-nav">
            <Nav.Item>
              <Nav.Link href="/maps">
                <i className="bi bi-map"></i> Map
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/redirect_to_react">
                <i className="bi bi-file-code"></i> React
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/projects_list">
                <i className="bi bi-folder"></i> Projects
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="https://www.biologie.uni-konstanz.de/voolstra/">
                <i className="bi bi-person"></i> About Us
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="https://github.com/greenjune-ship-it/djangoExperiment/issues">
                <i className="bi bi-question-circle"></i> Get Help
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

        <div className="ms-lg-4">
          {authStatus.authenticated ? (
            <div className="d-flex align-items-center">
              <span className="me-2 text-dark">Welcome, {authStatus.username}!</span>
              <form action="/logout" method="post">
                <Button type="submit" variant="link" className="nav-link text-dark">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Button>
              </form>
            </div>
          ) : (
            <Nav.Item>
              <Nav.Link href="/login" className="text-dark">
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
