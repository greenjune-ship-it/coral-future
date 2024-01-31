import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { fetchBiosamples } from 'apis/biosamples';
import Markers from './Markers';


const Map = ({ backendUrl, filters }) => {
  const { minTemperature, maxTemperature } = filters;

  const [biosamples, setBiosamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState([]);

  const [uniqueSpecies, setUniqueSpecies] = useState([]);

  const biosamplesapiUrl = `${backendUrl}/api/biosamples`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const biosamplesData = await fetchBiosamples(biosamplesapiUrl);
        setBiosamples(biosamplesData);
        setFilteredMarkers(biosamplesData); // Set filteredMarkers to biosamples data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [biosamplesapiUrl]);

  useEffect(() => {
    const speciesSet = new Set(biosamples.map(marker => marker.species));
    setUniqueSpecies([...speciesSet]);
  }, [biosamples]);

  const handleFilter = () => {
    let filteredData;
  
    if (filters.species === '') {
      // If species filter is empty, display all biosamples
      filteredData = biosamples;
    } else {
      // Filter biosamples based on selected species
      filteredData = biosamples.filter(biosample => {
        return filters.species.includes(biosample.species);
      });
    }
  
    setFilteredMarkers(filteredData);
    console.log('Filtered markers:', filteredData); // Log filtered markers
  };

  useEffect(() => {
    console.log('Filters updated:', filters); // Log when filters are updated
    handleFilter(); // Update filteredMarkers when filters change
  }, [filters]); // Update filter whenever filters change

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const avgLat = biosamples.reduce((sum, marker) => sum + marker.latitude, 0) / biosamples.length;
  const avgLng = biosamples.reduce((sum, marker) => sum + marker.longitude, 0) / biosamples.length;

  return (
    <MapContainer center={[avgLat, avgLng]} zoom={3} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers markers={filteredMarkers} />
    </MapContainer>
  );
};

export default Map;
