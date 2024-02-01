import React, { useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';

const AddToCartButton = ({ authStatus }) => {

  return (
    <div>
      <Row className="mb-3">
        <Col>
          {authStatus.authenticated && authStatus.username ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setAlertShow(true);
              }}
              style={{ width: '100%' }}
            >
              <i class="bi bi-cart4"></i> Add to cart
            </Button>
          ) : (
            <Alert variant="warning">Login to add data to cart</Alert>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {alertShow && <Alert variant="success">Item added to cart!</Alert>}
        </Col>
      </Row>
    </div>
  );
};

export default AddToCartButton;
