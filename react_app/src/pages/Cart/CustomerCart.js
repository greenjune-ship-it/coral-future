import React, { useContext, useState } from 'react';
import UserCartContextProvider, { UserCartContext } from 'contexts/UserCartContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Separate component for cart manipulation buttons
const CartManipulationPanel = ({ onEmptyCart, onDeleteSelected }) => (
  <Row className="mb-4">
    <Col>
      <Button variant="primary" onClick={onEmptyCart}>
        <i className="bi bi-trash3"></i> Empty Cart
      </Button>
    </Col>
    <Col>
      <Button variant="primary" onClick={onDeleteSelected}>
        Delete Selected
      </Button>
    </Col>
  </Row>
);

const CustomerCart = () => {
  const { userCart, emptyUserCart, removeFromUserCart } = useContext(UserCartContext);
  const [selectedColonyIds, setSelectedColonyIds] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleEmptyCart = () => {
    try {
      emptyUserCart(backendUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSelected = () => {
    try {
      removeFromUserCart(selectedColonyIds, backendUrl);
      // Clear selected IDs
      setSelectedColonyIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (colonyId) => {
    // Toggle selected colonies
    setSelectedColonyIds((prevSelected) =>
      prevSelected.includes(colonyId)
        ? prevSelected.filter((id) => id !== colonyId)
        : [...prevSelected, colonyId]
    );
  };

  return (
    <UserCartContextProvider>
      <Container className="my-5">
        <h1 className="text-center mb-4">User Cart</h1>
        {userCart.length > 0 ? (
          <>
            {/* Separate panel for cart manipulation buttons */}
            <CartManipulationPanel
              onEmptyCart={handleEmptyCart}
              onDeleteSelected={handleDeleteSelected}
            />

            <Row>
              {userCart.map((colony) => (
                <Col key={colony.id} xs={12} md={6} lg={4} className="mb-4 position-relative">
                  <div className="bg-light p-3 rounded">
                    <h5>Colony {colony.name}</h5>
                    <p>ID: {colony.id}</p>
                    <p>Species: {colony.species}</p>
                    <p>Country: {colony.country}</p>
                    <p>ED50: {colony.ed50_value}</p>
                    <input
                      type="checkbox"
                      checked={selectedColonyIds.includes(colony.id)}
                      onChange={() => handleCheckboxChange(colony.id)}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </Container>
    </UserCartContextProvider>
  );
};

export default CustomerCart;
