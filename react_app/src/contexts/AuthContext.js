import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [authData, setAuthData] = useState({ username: '', authenticated: false });

  const setAuth = (username, authenticated) => {
    setAuthData({ username: username, authenticated: authenticated });
  };

  const checkAuthentication = async (backendUrl) => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/status`, {
        withCredentials: true,
      });

      const { username, authenticated } = response.data;

      setAuth(username, authenticated);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuthentication(process.env.REACT_APP_BACKEND_URL);
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
