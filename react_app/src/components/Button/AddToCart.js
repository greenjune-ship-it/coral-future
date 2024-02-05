import React, { useEffect, useState, useContext } from 'react';
import { Button, FormGroup, Alert, Row, Col } from 'react-bootstrap';
// Internal imports
// Contexts
import { AuthContext } from 'contexts/AuthContext';
import { BioSamplesFilterContext } from 'contexts/BioSamplesFilterContext';
import { UserCartContext } from 'contexts/UserCartContext';

const AddToCartButton = () => {

  const { authData } = useContext(AuthContext);
  const { filteredBioSamples } = useContext(BioSamplesFilterContext);
  const { addToUserCart } = useContext(UserCartContext);

  const [alertShow, setAlertShow] = useState(false);
  const [alertShowTime, setAlertShowTime] = useState(0);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    // Disappearing alert only for success
    if (authData.authenticated && !errorOccurred && alertShow) {
      const timer = setTimeout(() => {
        setAlertShow(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alertShow, alertShowTime]);


  const handleAddToCart = async () => {
    setAlertShow(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const biosampleIds = filteredBioSamples.map(sample => sample.id);
      // Put data in Django DB
      await addToUserCart(biosampleIds, backendUrl);
      setErrorOccurred(false);
      setAlertShowTime(Date.now());
    } catch (error) {
      console.error('Error adding samples to cart:', error);
      setErrorOccurred(true);
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <FormGroup className="mb-2">
            <Button
              type="button"
              variant="primary"
              onClick={handleAddToCart}
              style={{ width: '100%' }}
            >
              <i className="bi bi-cart4"></i> Add to cart
            </Button>
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {authData.authenticated && !errorOccurred && alertShow && (
            // If respond to add data is good send success if bad, display variant error
            <Alert variant='success'>
              Item added to cart!
            </Alert>
          )}
          {authData.authenticated && errorOccurred && alertShow && (
            <Alert variant='danger'>
              An error occurred while adding to cart
            </Alert>
          )}
          {!authData.authenticated && errorOccurred && alertShow && (
            <Alert variant='warning'>
              Login to add data to cart
            </Alert>
          )}

        </Col>
      </Row>
    </div>
  );
};

export default AddToCartButton;
