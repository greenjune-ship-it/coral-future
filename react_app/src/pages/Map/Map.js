import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

import Markers from './Markers';
import filterBioSamples from './utils/filterBioSamples';

const Map = ({ backendUrl, filters }) => {
  const [biosamples, setBiosamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [uniqueSpecies, setUniqueSpecies] = useState([]);

  const biosamplesapiUrl = `${backendUrl}/api/biosamples`;
  const observationsapiUrl = `${backendUrl}/api/observations`;

  // Add a state to track whether initial data loading is complete
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const biosampledata = await axios.get(biosamplesapiUrl);
        console.log('Initial biosamples data:', biosampledata.data); // Log initial biosamples data
        setBiosamples(biosampledata.data);
        setLoading(false);
        setInitialDataLoaded(true); // Mark initial data loading as complete
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [biosamplesapiUrl]);

  useEffect(() => {
    console.log('Filters updated:', filters);
    if (initialDataLoaded) { // Only apply filters after initial data loading is complete
      handleFilter();
    }
  }, [filters, initialDataLoaded]);

  const handleFilter = () => {
    if (Object.keys(filters).length === 0) {
      setFilteredMarkers(biosamples);
    } else {
      const filteredData = filterBioSamples(biosamples, filters);
      setFilteredMarkers(filteredData);
      console.log('Filtered markers:', filteredData);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Calculate the average coordinates for centering the map
  const avgLat = biosamples.reduce((sum, marker) => sum + marker.latitude, 0) / biosamples.length;
  const avgLng = biosamples.reduce((sum, marker) => sum + marker.longitude, 0) / biosamples.length;

  return (
    <div>
      <MapContainer center={[avgLat, avgLng]} zoom={3} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers markers={filteredMarkers} />
      </MapContainer>
    </div>
  );
};

export default Map;
