import React, { useContext } from 'react';
import UserCartContextProvider, { UserCartContext } from 'contexts/UserCartContext';

const CustomerCart = () => {
  const { userCart } = useContext(UserCartContext);

  return (
    <UserCartContextProvider>
      <div>
        <h1>Customer Cart</h1>
        {userCart.length > 0 ? (
          userCart.map((sample) => (
            <div key={sample.id}>
              <h4>Sample ID: {sample.id}</h4>
              <p>Country: {sample.country}, {sample.species} ({sample.collection_date})</p>
            </div>
          ))
        ) : (
          <p>No BioSamples in Cart</p>
        )}
      </div>
    </UserCartContextProvider>
  );
};

export default CustomerCart;
