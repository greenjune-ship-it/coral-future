import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, LayerGroup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

import Markers from './Markers'

const Map = ({ backendUrl, filters }) => {
  const { minTemperature, maxTemperature } = filters; // Destructure minTemperature and maxTemperature from filters

  const [biosamples, setBiosamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState([]);

  const [uniqueSpecies, setUniqueSpecies] = useState([]);

  const biosamplesapiUrl = `${backendUrl}/api/biosamples`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const biosampledata = await axios.get(biosamplesapiUrl);

        setBiosamples(biosampledata.data);
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
    const filteredData = biosamples.filter(biosample => {
      // Check if the biosample's species matches the selected species
      return filters.species.includes(biosample.species);
    });
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