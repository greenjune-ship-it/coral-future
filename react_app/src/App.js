// External imports
import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
// Contexts
import AuthContextProvider from 'contexts/AuthContext'
import BioSamplesFilterProvider from 'contexts/BioSamplesFilterContext';
// Pages
import Map from 'pages/Map/Map';
// Components
import NavigationBar from 'components/Navbar/Navbar';
import InputSidebar from 'components/Sidebar/Sidebar';
import CustomerCart from 'components/Cart/Cart';

const App = () => {

  return (
    <AuthContextProvider>
      <BioSamplesFilterProvider>
        <div>
          <NavigationBar />
          <Container className="text-center mt-4">
            <h1>BioSamples Explorer</h1>
            <Row>
              <Col md={3}>
                {/* Pass handleApplyFilters function as a prop */}
                <InputSidebar/>
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
        </div>
      </BioSamplesFilterProvider>
    </AuthContextProvider>
  );
};

export default App;
