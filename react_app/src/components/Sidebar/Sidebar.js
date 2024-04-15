// External imports
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Form, FormGroup, Row, Col } from 'react-bootstrap';
import { Box, Slider, Typography } from '@mui/material';
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

  const [maxAbsTT, setMaxAbsTT] = useState(null);
  const [minAbsTT, setMinAbsTT] = useState(null);
  const [maxRelTT, setMaxRelTT] = useState(null);
  const [minRelTT, setMinRelTT] = useState(null);

  useEffect(() => {
    fetchMaxMinData(process.env.REACT_APP_BACKEND_URL); // Call the fetch function
  }, []);

  const fetchMaxMinData = async (backendUrl) => {
    try {
      const response = await axios.get(`${backendUrl}/api/public/thermal-tolerances/max-min/`);
      const data = response.data;
      setMaxAbsTT(data.max_abs_thermal_tolerance);
      setMinAbsTT(data.min_abs_thermal_tolerance);
      setMaxRelTT(data.max_rel_thermal_tolerance);
      setMinRelTT(data.min_rel_thermal_tolerance);
      // Once the data is fetched, set the selected values
      setSelectedEd50Temperatures([data.min_abs_thermal_tolerance, data.max_abs_thermal_tolerance]);
      setSelectedThermalToleranceTemperatures([data.min_rel_thermal_tolerance, data.max_rel_thermal_tolerance]);
    } catch (error) {
      console.error('Error fetching max min data:', error);
    }
  };

  // Initialize selected values as null
  const [selectedEd50Temperatures, setSelectedEd50Temperatures] = useState([null, null]);
  const [selectedThermalToleranceTemperatures, setSelectedThermalToleranceTemperatures] = useState([null, null]);

  const handleApplyFilters = () => {
    const newFilters = {
      species: selectedSpecies,
      project: selectedProject,
      ed50Temperatures: selectedEd50Temperatures,
      thermalToleranceTemperatures: selectedThermalToleranceTemperatures,
      years: selectedDates
    };
    // Log filters before applying changes
    console.log('Selected filters:', newFilters);
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setSelectedSpecies('');
    setSelectedProject('');
    setSelectedEd50Temperatures([minAbsTT, maxAbsTT]);
    setSelectedThermalToleranceTemperatures([minRelTT, maxRelTT]);
    setSelectedDates([]);
    setFilters({}); // Reset filters
  };

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
    console.log('Selected species:', e.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    console.log('Selected project:', e.target.value);
  };

  // Event handler for Abs. Thermal Tolerance ED50 slider
  const handleEd50TemperatureChange = (event, newValues) => {
    setSelectedEd50Temperatures(newValues);
    console.log('Selected Abs. TT temperatures:', newValues);
  };

  // Event handler for Rel. Thermal Tolerance ED50 - MMM slider
  const handleThermalToleranceTemperatureChange = (event, newValues) => {
    setSelectedThermalToleranceTemperatures(newValues);
    console.log('Selected Rel. TT temperatures:', newValues);
  };

  return (
    <div className="sidebar" style={{ backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', height: '700px' }}>
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
              <Form.Label>Abs. Thermal Tolerance ED50</Form.Label>
              <Container>
                <Slider
                  value={selectedEd50Temperatures}
                  onChange={handleEd50TemperatureChange}
                  valueLabelDisplay="auto"
                  min={minAbsTT}
                  max={maxAbsTT}
                  step={0.01}
                  sx={{
                    '& .MuiSlider-thumb': {
                      color: '#007bff', // Change thumb color
                    },
                    '& .MuiSlider-track': {
                      height: 8,
                      backgroundColor: '#007bff', // Change track color
                    },
                    '& .MuiSlider-rail': {
                      height: 6,
                      backgroundColor: '#ddd', // Change rail color
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: '#ddd', // Change rail color
                    },
                    '& .MuiSlider-markLabel': {
                      color: '#007bff', // Change mark label color
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="body2"
                    onClick={() => setSelectedEd50Temperatures([minAbsTT, selectedEd50Temperatures[1]])}
                    sx={{ cursor: 'pointer' }}
                  >
                    {minAbsTT}°C
                  </Typography>
                  <Typography
                    variant="body2"
                    onClick={() => setSelectedEd50Temperatures([selectedEd50Temperatures[0], maxAbsTT])}
                    sx={{ cursor: 'pointer' }}
                  >
                    {maxAbsTT}°C
                  </Typography>
                </Box>
              </Container>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormGroup className="mb-2">
              <Form.Label>Rel. Thermal Tolerance ED50 - MMM</Form.Label>
              <Container>
                <Slider
                  value={selectedThermalToleranceTemperatures}
                  onChange={handleThermalToleranceTemperatureChange}
                  valueLabelDisplay="auto"
                  min={minRelTT}
                  max={maxRelTT}
                  step={0.01}
                  marks={[{ value: 7.5, label: '7.5°C' }]}
                  sx={{
                    '& .MuiSlider-thumb': {
                      color: '#007bff', // Change thumb color
                    },
                    '& .MuiSlider-track': {
                      height: 8,
                      backgroundColor: '#007bff', // Change track color
                    },
                    '& .MuiSlider-rail': {
                      height: 6,
                      backgroundColor: '#ddd', // Change rail color
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: '#ddd', // Change rail color
                    },
                    '& .MuiSlider-markLabel': {
                      color: '#007bff', // Change mark label color
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="body2"
                    onClick={() => setSelectedThermalToleranceTemperatures([minRelTT, selectedThermalToleranceTemperatures[1]])}
                    sx={{ cursor: 'pointer' }}
                  >
                    {minRelTT}°C
                  </Typography>
                  <Typography
                    variant="body2"
                    onClick={() => setSelectedThermalToleranceTemperatures([selectedThermalToleranceTemperatures[0], maxRelTT])}
                    sx={{ cursor: 'pointer' }}
                  >
                    {maxRelTT}°C
                  </Typography>
                </Box>
              </Container>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={9} className="pe-0">
            <Button variant="primary" onClick={handleApplyFilters} style={{ width: '100%' }}>
              Apply Filters
            </Button>
          </Col>
          <Col xs={3} className="ps-1">
            <Button variant="primary" onClick={handleResetFilters} style={{ width: '100%' }}>
              <i className="bi bi-trash3"></i>
            </Button>
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