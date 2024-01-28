import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TemperatureFilter = ({ onFilter }) => {
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');

  const handleFilterClick = () => {
    onFilter(minTemperature, maxTemperature);
  };

  return (
    <div>
      <Form.Control size="lg" type="text" placeholder="Min Temperature"   value={minTemperature} onChange={(e) => setMinTemperature(parseFloat(e.target.value))}   />
      <Form.Control size="lg" type="text" placeholder="Max Temperature"   value={maxTemperature} onChange={(e) => setMaxTemperature(parseFloat(e.target.value))}   />
       <Button variant="primary" onClick={handleFilterClick} >Filter</Button>{' '}
    </div>
  );
};

export default TemperatureFilter;