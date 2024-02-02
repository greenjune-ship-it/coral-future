import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

export const BioSamplesFilterContext = createContext();

const BioSamplesFilterProvider = (props) => {
  const [allBioSamples, setAllBioSamples] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredBioSamples, setFilteredBioSamples] = useState([]);
  

  useEffect(() => {
    const fetchData = async (backendUrl) => {
      try {
        const response = await axios.get(`${backendUrl}/api/biosamples`);
        setAllBioSamples(response.data);
        console.log('Fetch', response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(process.env.REACT_APP_BACKEND_URL);
  }, []);

  return (
    <BioSamplesFilterContext.Provider
      value={{ allBioSamples, setAllBioSamples, filters, setFilters, filteredBioSamples, setFilteredBioSamples }}
    >
      {props.children}
    </BioSamplesFilterContext.Provider>
  );
};

export default BioSamplesFilterProvider;
