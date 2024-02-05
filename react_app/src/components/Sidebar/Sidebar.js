// External imports
import React, { useState, useContext } from 'react';
import RangeSlider from 'react-range-slider-input';
import { Form, FormGroup, Button, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-range-slider-input/dist/style.css';
// Internal imports
// Contexts
import { BioSamplesFilterContext } from 'contexts/BioSamplesFilterContext';
// Components
import AddToCartButton from 'components/Button/AddToCart';

const InputSidebar = () => {

  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedTemperatures, setSelectedTemperatures] = useState([30, 39]);
  const [selectedYears, setSelectedYears] = useState([2005, 2015]);
  // Get all BioSamples from Context and define list of species
  const { allBioSamples, setFilters } = useContext(BioSamplesFilterContext);
  const speciesList = [...new Set(allBioSamples.map(allBioSamples => allBioSamples.species))].sort()
  
  const handleApplyFilters = () => {
    const newFilters = {
      species: selectedSpecies,
      temperatures: selectedTemperatures,
      years: selectedYears
    };
    // Log filters before applying changes
    console.log('Selected filters:', newFilters);
    setFilters(newFilters);
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
    <div className="sidebar" style={{ backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', height: '600px' }}>
      <h2 style={{ marginBottom: '20px' }}>Filters</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>Species</Form.Label>
              <Form.Control as="select" value={selectedSpecies} onChange={handleSpeciesChange}>
                <option value="">All species</option>
                {speciesList.map((species, index) => (
                  <option key={index} value={species}>{species}</option>
                ))}
              </Form.Control>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>Temperature</Form.Label>
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
              <Form.Label>Year</Form.Label>
              <RangeSlider
                min={2000}
                max={2022}
                defaultValue={selectedYears}
                onInput={handleYearChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Button variant="primary" onClick={handleApplyFilters} style={{ width: '100%' }} >
                Apply Filters
              </Button>
            </FormGroup>
          </Col>
        </Row>


        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <AddToCartButton />
            </FormGroup>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default InputSidebar;
