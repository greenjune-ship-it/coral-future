import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [authData, setAuthData] = useState({ username: '', authenticated: false });

  const checkAuthentication = async (backendUrl) => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/status/`, {
        withCredentials: true,
      });

      const { username, authenticated } = response.data;
      setAuthData({
        username: username, authenticated: authenticated
      });
      console.log('Get authentication context')

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuthentication(process.env.REACT_APP_BACKEND_URL);
  }, []);

  return (
    <AuthContext.Provider value={{ authData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
