// App.js
import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { checkAuthentication } from './apis/auth';
import Map from './pages/Map/Map';
import NavigationBar from './components/Navbar/Navbar';
import InputSidebar from './components/Sidebar/Sidebar';

const App = () => {
  const [authStatus, setAuthStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({}); // State to hold data from Sidebar

  // Access the backend URL from the environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters); // Update state with data from Sidebar
  };

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const authData = await checkAuthentication(backendUrl); // Call the checkAuthentication function
        setAuthStatus(authData);
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Optionally, you can set an error state or display an error message to the user.
      } finally {
        setLoading(false);
      }
    };

    fetchAuthentication();
  }, []);

  return (
    <div>
      <NavigationBar authStatus={authStatus} />
      <Container className="text-center mt-4">
        <h1>BioSamples Explorer</h1>
        <Row>
          <Col md={3}>
            {/* Pass handleApplyFilters function as a prop */}
            <InputSidebar onApplyFilters={handleApplyFilters} />
          </Col>
          <Col md={9}>
            {/* Pass filters state as a prop */}
            <Map filters={filters} backendUrl={backendUrl} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
