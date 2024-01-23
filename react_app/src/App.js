import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './AppNavbar';

const App = () => {
  const [authStatus, setAuthStatus] = useState({});

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/check-authentication/', {
          withCredentials: true,
        });

        // Parse the response data
        const { username, is_authenticated } = response.data;

        // Set the authentication status and username
        setAuthStatus({
          username: username,
          is_authenticated: is_authenticated,
        });
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      <AppNavbar authStatus={authStatus} />
      <Container className="text-center mt-4">
        <h1>Authentication Status:</h1>
        {authStatus.is_authenticated ? (
          <p>Welcome, {authStatus.username}!</p>
        ) : (
          <p>You are not authenticated. Please set the session ID.</p>
        )}
        {/* Your other React components */}
      </Container>
    </div>
  );
};

export default App;
