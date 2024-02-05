import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
// Contexts
import BioSamplesFilterProvider from 'contexts/BioSamplesFilterContext';
// Components
import InputSidebar from 'components/Sidebar/Sidebar';
import CustomerCart from 'pages/Map/CustomerCart';
import Map from 'components/Map/Map'


const CustomerMap = () => {

  return (
    <BioSamplesFilterProvider>
      <Container className="text-center mt-4">
      <h1>BioSamples Explorer</h1>
      <Row>
        <Col md={3}>
          {/* Pass handleApplyFilters function as a prop */}
          <InputSidebar />
        </Col>
        <Col md={9} style={{ height: '600px' }}>
          {/* Pass filters state as a prop */}
          <Map />
        </Col>
      </Row>
      <Row>
        <CustomerCart />
      </Row>
      </Container>
    </BioSamplesFilterProvider>
  )
};

export default CustomerMap;