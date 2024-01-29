// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar/Navbar';
import InputSidebar from './components/Sidebar/Sidebar';
import Map from './pages/Map/Map';

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
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/status`, {
          withCredentials: true,
        });

        const { username, authenticated } = response.data;

        setAuthStatus({
          username: username,
          authenticated: authenticated,
        });
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Optionally, you can set an error state or display an error message to the user.
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      <NavigationBar authStatus={authStatus} />
      <Container className="text-center mt-4">
        <h1>Authentication Status:</h1>

        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : authStatus.authenticated ? (
          <p>Welcome, {authStatus.username}!</p>
        ) : (
          <p>You are not authenticated. Please set the session ID.</p>
        )}

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
