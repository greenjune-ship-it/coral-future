import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button, Row, Col } from 'react-bootstrap';

const InputSidebar = ({ onApplyFilters }) => {
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedTemperature, setSelectedTemperature] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleApplyChanges = () => {
    const filters = {
      species: selectedSpecies,
      temperature: selectedTemperature,
      year: selectedYear
    };
    console.log('Filters:', filters); // Log filters before applying changes
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
    console.log('Selected species:', e.target.value); // Log selected species
  };

  const handleTemperatureChange = (e) => {
    setSelectedTemperature(e.target.value);
    console.log('Selected temperature:', e.target.value); // Log selected temperature
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    console.log('Selected year:', e.target.value); // Log selected year
  };

  return (
    <div className="sidebar">
      <h2>Filters</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>Species:</Form.Label>
              <Form.Control as="select" value={selectedSpecies} onChange={handleSpeciesChange}>
                <option value="">Select species</option>
                <option value="Acropora germania">Acropora germania</option>
                <option value="Porites germania">Porites germania</option>
                <option value="Stylophora pistillata">Stylophora pistillata</option>
              </Form.Control>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>Temperature Range:</Form.Label>
              <Form.Control as="select" value={selectedTemperature} onChange={handleTemperatureChange}>
                <option value="">Select temperature range</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>Year:</Form.Label>
              <Form.Control type="text" value={selectedYear} onChange={handleYearChange} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button onClick={handleApplyChanges} variant="primary">Apply Changes</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InputSidebar;
