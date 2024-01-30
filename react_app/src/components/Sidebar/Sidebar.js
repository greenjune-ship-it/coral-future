import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import { Form, FormGroup, FormControl, Button, Row, Col } from 'react-bootstrap';

import "react-range-slider-input/dist/style.css";

const InputSidebar = ({ onApplyFilters }) => {
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedTemperatures, setSelectedTemperatures] = useState([30, 39]);
  const [selectedYears, setSelectedYears] = useState([2005, 2015]);

  const handleApplyChanges = () => {
    const filters = {
      species: selectedSpecies,
      temperature: selectedTemperatures,
      years: selectedYears
    };
    console.log('Filters:', filters); // Log filters before applying changes
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
    console.log('Selected species:', e.target.value);
  };

  const handleTemperatureChange = (values) => {
    setSelectedTemperatures(values);
    console.log('Selected temperatures:', values);
  };

  const handleYearChange = (values) => {
    setSelectedYears(values);
    console.log('Selected years:', values);
  };

  return (
    <div className="sidebar" style={{ backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '20px' }}>Filters</h2>
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
              <Form.Label>Temperature:</Form.Label>
              <RangeSlider
                min={0}
                max={100}
                defaultValue={selectedTemperatures}
                onInput={handleTemperatureChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>Year:</Form.Label>
                <RangeSlider
                  min={2000}
                  max={2022}
                  defaultValue={selectedYears}
                  onInput={handleYearChange}
                />
            </FormGroup>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleApplyChanges} style={{ width: '100%' }}>
          Apply Filters
        </Button>
      </Form>
    </div>
  );
};

export default InputSidebar;