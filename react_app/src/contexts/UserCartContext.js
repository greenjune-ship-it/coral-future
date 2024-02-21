import axios from 'axios';
import Cookie from 'js-cookie';
import React, { useState, useEffect, createContext } from 'react';

export const UserCartContext = createContext();

const UserCartContextProvider = (props) => {
  const [userCart, setUserCart] = useState([]);

  const getUserCart = async (backendUrl) => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/cart/`, {
        withCredentials: true,
      });
      // Update the state of userCart only from database
      setUserCart(response.data)
      console.log('Data in cart:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToUserCart = async (colonyIds, backendUrl) => {
    const response = await axios.post(`${backendUrl}/api/auth/cart/`,
      { colony_ids: colonyIds },
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken'),
        },
      }
    );
    return response
  };

  const emptyUserCart = async (backendUrl) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/auth/cart/`,
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
          },
        }
      );
      getUserCart(process.env.REACT_APP_BACKEND_URL);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromUserCart = async (colonyIds, backendUrl) => {
    try {
      const response = await axios.patch(`${backendUrl}/api/auth/cart/`,
        { colony_ids: colonyIds },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': Cookie.get('csrftoken'),
          },
        }
      );
      getUserCart(process.env.REACT_APP_BACKEND_URL);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    // Set the backend URL here (e.g., process.env.REACT_APP_BACKEND_URL)
    getUserCart(process.env.REACT_APP_BACKEND_URL);
  }, []);

  return (
    <UserCartContext.Provider value={{ userCart, addToUserCart, emptyUserCart, removeFromUserCart }}>
      {props.children}
    </UserCartContext.Provider>
  );
};

export default UserCartContextProvider;
