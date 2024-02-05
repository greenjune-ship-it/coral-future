import React, { useContext } from 'react';
import UserCartContextProvider, { UserCartContext } from 'contexts/UserCartContext';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const CustomerCart = () => {
  const { userCart } = useContext(UserCartContext);

  return (
    <UserCartContextProvider>
      <Container className="my-5"> {/* Center the content */}
        <h1 className="text-center mb-4">Customer Cart</h1>
        {userCart.length > 0 ? (
          <Row>
            {userCart.map((sample) => (
              <Col key={sample.id} xs={12} md={6} lg={4} className="mb-4">
                <div className="bg-light p-3 rounded">
                  <h4>Sample ID: {sample.id}</h4>
                  <p>
                    Country: {sample.country}, {sample.species} ({sample.collection_date})
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No BioSamples in Cart</p>
        )}
      </Container>
    </UserCartContextProvider>
  );
};

export default CustomerCart;
