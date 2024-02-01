import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';

const Cart = ({ authStatus, filteredBioSamples }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    console.log('Filtered Biosamples in Cart:',filteredBioSamples);

    return (
        <div className="Cart Button" style={{ backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        {authStatus.authenticated && authStatus.username ? (
            <div>
                <Button  type="button" variant="primary" onClick={handleShow}  style={{ width: '100%' }}>
                            Add to cart {authStatus.username}
                 </Button>
                 <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add to Cart</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>Data was added to your cart</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                     Close
                                </Button>
                                 <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                </Button>
                            </Modal.Footer>
                </Modal>

            </div>
          ) : (
            <ListGroup>
                    <ListGroup.Item variant="warning" >You can add your data to cart only being authenticated </ListGroup.Item>
            </ListGroup>
          )}
        
        </div>
    );
};

export default Cart ;