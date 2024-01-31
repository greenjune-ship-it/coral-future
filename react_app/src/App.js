// External imports
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
import Map from './pages/Map/Map';
import NavigationBar from './components/Navbar/Navbar';
import InputSidebar from './components/Sidebar/Sidebar';
// API calls
import { checkAuthentication } from './apis/auth';
import { fetchBiosamples } from 'apis/biosamples';

const App = () => {
  const [authStatus, setAuthStatus] = useState({});
  const [biosamples, setBiosamples] = useState([]);
  const [filters, setFilters] = useState({});
  // Access the backend URL from the environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const authData = await checkAuthentication(backendUrl);
        setAuthStatus(authData);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    fetchAuthentication();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const biosamplesData = await fetchBiosamples(backendUrl);
        setBiosamples(biosamplesData);
        console.log('Fetched BioSamples', biosamplesData)
      } catch (error) {
        console.error('Error fetching BioSamples:', error);
      }
    };

    fetchData();
  }, []);

  // Update state with data from Sidebar
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <NavigationBar authStatus={authStatus} />
      <Container className="text-center mt-4">
        <h1>BioSamples Explorer</h1>
        <Row>
          <Col md={3}>
            {/* Pass handleApplyFilters function as a prop */}
            <InputSidebar onApplyFilters={handleApplyFilters} speciesList={ [...new Set(biosamples.map(biosample => biosample.species))].sort()} />
          </Col>
          <Col md={9}>
            {/* Pass filters state as a prop */}
            <Map filters={filters} biosamples={biosamples} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
