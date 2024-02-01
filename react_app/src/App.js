// External imports
import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
// Contexts
import AuthContextProvider, { AuthContext } from 'contexts/AuthContext'
// Pages
import Map from 'pages/Map/Map';
// Hooks
import useFetchBiosamples from './hooks/useFetchBiosamples';
// Components
import NavigationBar from 'components/Navbar/Navbar';
import InputSidebar from 'components/Sidebar/Sidebar';
import CustomerCart from 'components/Cart/Cart';

const App = () => {
  const [biosamples, setBiosamples] = useState([]);
  const [filters, setFilters] = useState({});
  // Access the backend URL from the environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useFetchBiosamples(backendUrl, setBiosamples)

  // Update state with data from Sidebar
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <AuthContextProvider>
      <div>
        <NavigationBar />
        <Container className="text-center mt-4">
          <h1>BioSamples Explorer</h1>
          <Row>
            <Col md={3}>
              {/* Pass handleApplyFilters function as a prop */}
              <InputSidebar onApplyFilters={handleApplyFilters} speciesList={[...new Set(biosamples.map(biosample => biosample.species))].sort()} />
            </Col>
            <Col md={9} style={{ height: '600px' }}>
              {/* Pass filters state as a prop */}
              <Map filters={filters} biosamples={biosamples} />
            </Col>
          </Row>
          <Row>
            {/* <CustomerCart filteredBioSamples={{}} /> */}
          </Row>
        </Container>
      </div>
    </AuthContextProvider>
  );
};

export default App;
