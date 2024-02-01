import React, { useEffect, useState, useContext } from 'react';
import { Button, FormGroup, Alert, Row, Col } from 'react-bootstrap';
// Contexts
import { AuthContext } from 'contexts/AuthContext'

const AddToCartButton = () => {

  const { authData } = useContext(AuthContext);

  const [alertShow, setAlertShow] = useState(false);
  const [alertShowTime, setAlertShowTime] = useState(0);
  const [alertStyle, setAlertStyle] = useState({});

  useEffect(() => {
    if (alertShow) {
      const timer = setTimeout(() => {
        setAlertShow(false);
      }, 3000);

      const opacity = (3 - Date.now() + alertShowTime) / alertShowTime;
      setAlertStyle({
        opacity: opacity > 0 ? opacity : 0,
        transition: 'opacity 1s ease-in-out'
      });

      return () => clearTimeout(timer);
    }

  }, [alertShow, alertShowTime]);

  const handleClick = () => {
    setAlertShow(true);
    setAlertStyle({ opacity: 1 })
    setAlertShowTime(Date.now());
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <FormGroup className="mb-2">
            <Button
              type="button"
              variant="primary"
              onClick={handleClick}
              style={{ width: '100%' }}
            >
              <i className="bi bi-cart4"></i> Add to cart
            </Button>
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {authData.authenticated && authData.username !== '' && alertShow && (
            <Alert variant="success" style={alertStyle}>
              Item added to cart!
            </Alert>
          )}
          {(!authData.authenticated || authData.username === '') && alertShow && (
            <Alert variant="warning" style={alertStyle}>
              Login to add data to cart
              </Alert>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AddToCartButton;
