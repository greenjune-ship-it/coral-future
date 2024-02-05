import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

export const UserCartContext = createContext();

const UserCartContextProvider = (props) => {
  const [userCart, setUserCart] = useState([]);

  const setUserCartData = (data) => {
    setUserCart(data);
  };

  const getUserCart = async (backendUrl) => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/cart/`, {
        withCredentials: true,
      });

      // Assuming you want to update the userCart state with the fetched data
      setUserCartData(response.data);
      console.log('Added data to cart:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Set the backend URL here (e.g., process.env.REACT_APP_BACKEND_URL)
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    getUserCart(backendUrl);
  }, []);

  return (
    <UserCartContext.Provider value={{ userCart, setUserCartData }}>
      {props.children}
    </UserCartContext.Provider>
  );
};

export default UserCartContextProvider;
