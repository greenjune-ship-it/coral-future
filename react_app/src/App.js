import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = () => {
    const [authStatus, setAuthStatus] = useState({});

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/check-authentication/', {
                    withCredentials: true,
                });

                console.log('Response:', response);

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
            <h1>Authentication Status:</h1>
            {authStatus.is_authenticated ? (
                <p>Welcome, {authStatus.username}!</p>
            ) : (
                <p>You are not authenticated. Please set the session ID.</p>
            )}
            {/* Your other React components */}
        </div>
    );
};

export default App;
