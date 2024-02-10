import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
// Contexts
import SidebarFilterProvider from 'contexts/SidebarFilterContext';
// Components
import InputSidebar from 'components/Sidebar/Sidebar';
import Map from 'components/Map/Map'


const CustomerMap = () => {

  return (
    <SidebarFilterProvider>
      <Container className="text-center mt-4">
        <h1>Colonies Explorer</h1>
        <Row>
          <Col md={3}>
            <InputSidebar />
          </Col>
          <Col md={9} style={{ height: '600px' }}>
            <Map />
          </Col>
        </Row>
      </Container>
    </SidebarFilterProvider>
  )
};

export default CustomerMap;
