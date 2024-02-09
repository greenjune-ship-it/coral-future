import React, { useContext } from 'react';
import UserCartContextProvider, { UserCartContext } from 'contexts/UserCartContext';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const CustomerCart = () => {
  const { userCart } = useContext(UserCartContext);

  return (
    <UserCartContextProvider>
      <Container className="my-5">
        <h1 className="text-center mb-4">Customer Cart</h1>
        {userCart.length > 0 ? (
          <Row>
            {userCart.map((colony) => (
              <Col key={colony.id} xs={12} md={6} lg={4} className="mb-4">
                <div className="bg-light p-3 rounded">
                  <h4>Colony ID: {colony.id}</h4>
                  <p>
                    Country: {colony.country}, {colony.species}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No colonies in Cart</p>
        )}
      </Container>
    </UserCartContextProvider>
  );
};

export default CustomerCart;
