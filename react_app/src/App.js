import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppNavbar from './AppNavbar';
import AppMap from './AppMap';

const App = () => {
  const [authStatus, setAuthStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  // Access the backend URL from the environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

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
      <AppNavbar authStatus={authStatus} />
      <Container className="text-center mt-4">
        <h1>Authentication Status:</h1>

        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : authStatus.authenticated ? (
          <p>Welcome, {authStatus.username}!</p>
        ) : (
          <p>You are not authenticated. Please set the session ID.</p>
        )}

        <AppMap center={mapCenter} />

        {/* Your other React components */}
      </Container>
    </div>
  );
};

export default App;
