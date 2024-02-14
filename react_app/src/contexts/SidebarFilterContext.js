import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

export const SidebarFilterContext = createContext();

const SidebarFilterProvider = (props) => {
  const [allColonies, setAllColonies] = useState([]);
  const [allBioSamples, setAllBioSamples] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredColonies, setFilteredColonies] = useState([]);

  useEffect(() => {
    const fetchColonies = async (backendUrl) => {
      try {
        const response = await axios.get(`${backendUrl}/api/public/colonies/`);
        setAllColonies(response.data);
        console.log('Retrieve Colonies from database');
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBioSamples = async (backendUrl) => {
      try {
        const response = await axios.get(`${backendUrl}/api/public/biosamples/`);
        setAllBioSamples(response.data);
        console.log('Retrieve BioSamples from database')
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProjects = async (backendUrl) => {
      try {
        const response = await axios.get(`${backendUrl}/api/public/projects/`);
        setAllProjects(response.data)
        console.log('Retrieve Projects from database');
      } catch (error) {
        console.error(error);
      }
    };

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    fetchColonies(backendUrl);
    fetchBioSamples(backendUrl);
    fetchProjects(backendUrl);
  }, []);

  return (
    <SidebarFilterContext.Provider
      value={{ allColonies, allBioSamples, allProjects, filters, setFilters, filteredColonies, setFilteredColonies }}
    >
      {props.children}
    </SidebarFilterContext.Provider>
  );
};

export default SidebarFilterProvider;
