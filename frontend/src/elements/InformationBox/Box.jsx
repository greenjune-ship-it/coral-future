import React, { useState } from 'react';
import { Card, Nav, Button } from 'react-bootstrap';

function Box({ information, Refs }) {
 const [showText, setShowText] = useState(false);
 const [info] = useState(information);
 const [refs] = useState(Refs);

 return (
    <Card>
      <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first" onClick={() => setShowText(false)}>Information</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link" onClick={() => setShowText(true)}>References</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        {showText ? <p>{refs}</p> : <p>{info}</p>}
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
 );
}
export default Box;