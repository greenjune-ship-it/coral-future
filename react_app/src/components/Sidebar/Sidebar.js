// External imports
import React, { useState, useContext } from 'react';
import { Slider } from '@mui/material';
import RangeSlider from 'react-range-slider-input';
import { Form, FormGroup, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-range-slider-input/dist/style.css';
// Internal imports
// Contexts
import { SidebarFilterContext } from 'contexts/SidebarFilterContext';
// Components
import AddToCartButton from 'components/Button/AddToCart';


const InputSidebar = () => {

  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  // Get all Colonies and Projects from Context and define list of species
  const { allColonies, allBioSamples, allProjects, setFilters } = useContext(SidebarFilterContext);
  const speciesList = [...new Set(allColonies.map(allColonies => allColonies.species))].sort();
  const projectList = [...new Set(allProjects.map(allProjects => allProjects.name))].sort();
  const collectionDateList = [...new Set(allBioSamples.map(biosample => biosample.collection_date))]
    .map(dateString => new Date(dateString))
    .sort((a, b) => a - b);

  // For Slider borders
  const ed50Values = allColonies.map(colony => colony.ed50_value);
  const maxEd50 = Math.max(...ed50Values);
  const minEd50 = Math.min(...ed50Values);

  const [selectedTemperatures, setSelectedTemperatures] = useState([minEd50, maxEd50]);

  const handleApplyFilters = () => {
    const newFilters = {
      species: selectedSpecies,
      project: selectedProject,
      temperatures: selectedTemperatures,
      years: selectedDates
    };
    // Log filters before applying changes
    console.log('Selected filters:', newFilters);
    setFilters(newFilters);
  };

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
    console.log('Selected species:', e.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    console.log('Selected project:', e.target.value);
  };

  const handleTemperatureChange = (event, newValues) => {
    setSelectedTemperatures(newValues);
    console.log('Selected temperatures:', newValues);
  };

  const handleDatesChange = (values) => {
    setSelectedDates(values);
    console.log('Selected dates:', values);
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
              <Form.Label>Project</Form.Label>
              <Form.Control as="select" value={selectedProject} onChange={handleProjectChange}>
                <option value="">All projects</option>
                {projectList.map((project, index) => (
                  <option key={index} value={project}>{project}</option>
                ))}
              </Form.Control>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>ED50 Values</Form.Label>
              <Slider
                value={selectedTemperatures}
                onChange={handleTemperatureChange}
                valueLabelDisplay="auto"
                min={minEd50}
                max={maxEd50}
                marks={[
                  {
                    value: minEd50,
                    label: `${minEd50}°C`
                  },
                  {
                    value: maxEd50,
                    label: `${maxEd50}°C`
                  }
                ]}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>BioSample Collection Date</Form.Label>
              <RangeSlider
                min={collectionDateList[0]}
                max={collectionDateList[collectionDateList.length - 1]}
                defaultValue={selectedTemperatures}
                onInput={handleDatesChange}
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
