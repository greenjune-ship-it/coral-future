import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, LayerGroup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

import Markers from './Markers'
import TemperatureFilter from './TemperatureFilter';

const Map = ({ backendUrl, minTemperature, maxTemperature }) => {

  const [biosamples, setBiosamples] = useState([]);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState([]);

  const [uniqueSpecies, setUniqueSpecies] = useState([]);

  const biosamplesapiUrl = `${backendUrl}/api/biosamples`;
  const observationsapiUrl = `${backendUrl}/api/observations`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const biosampledata = await axios.get(biosamplesapiUrl);
        const observationsdata = await axios.get(observationsapiUrl);

        setBiosamples(biosampledata.data);
        setObservations(observationsdata.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [biosamplesapiUrl, observationsapiUrl]);

  useEffect(() => {
    const speciesSet = new Set(biosamples.map(marker => marker.species));
    setUniqueSpecies([...speciesSet]);
  }, [biosamples]);

  useEffect(() => {
    handleFilter();
  }, [minTemperature, maxTemperature]);

  const handleFilter = () => {
    const filteredData = observations.filter(observation => {
      return observation.temperature >= minTemperature && observation.temperature <= maxTemperature;
    });
    setFilteredMarkers(filteredData);
    console.log('Selected Markers:', filteredData); // Log filtered markers
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

        <LayersControl position="topright">
          {uniqueSpecies.map(species => (
            <LayersControl.Overlay key={species} checked name={species}>
              <Markers markers={biosamples.filter(marker => marker.species === species)} />
            </LayersControl.Overlay>
          ))}
          <LayersControl.Overlay checked name="Filtered">
            <Markers markers={filteredMarkers} />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map;
