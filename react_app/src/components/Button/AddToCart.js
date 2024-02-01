import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Alert, Row, Col } from 'react-bootstrap';

const AddToCartButton = ({ authStatus }) => {

  const [alertShow, setAlertShow] = useState(false);
  const [alertShowTime, setAlertShowTime] = useState(0);
  const [alertStyle, setAlertStyle] = useState({});

  useEffect(() => {
    if (alertShow) {
      const timer = setTimeout(() => {
        setAlertShow(false);
      }, 1000);

      const opacity = (3 - Date.now() + alertShowTime) / alertShowTime;
      setAlertStyle({
        opacity: opacity > 0 ? opacity : 0,
        transition: 'opacity 1s ease-in-out'
      });

      return () => clearTimeout(timer);
    }

  }, [alertShow, alertShowTime]);

  return (
    <div>
      <Row className="mb-3">
        <Col>
          {authStatus.authenticated && authStatus.username ? (
            <FormGroup className="mb-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setAlertShow(true);
                  setAlertStyle({opacity: 1})
                  setAlertShowTime(Date.now());
                }}
                style={{ width: '100%' }}
              >
                <i className="bi bi-cart4"></i> Add to cart
              </Button>
            </FormGroup>
          ) : (
            <Alert variant="warning">Login to add data to cart</Alert>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {alertShow && (
            <Alert variant="success" style={alertStyle}>
              Item added to cart!
            </Alert>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AddToCartButton;
