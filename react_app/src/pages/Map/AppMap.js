// AppMap.js
import React, { useEffect, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, LayerGroup  } from 'react-leaflet';
import axios from 'axios';


import TemperatureFilter from './TemperatureFilter';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';



const AppMap = ({ backendUrl }) => {
  
  const [biosamples, setBiosamples] = useState([]);
  const [observations, setObservations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredMarkers, setFilteredMarkers] = useState([]);

  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');

  const biosamplesapiUrl = `${backendUrl}/api/biosamples`;
  const observationsapiUrl = `${backendUrl}/api/observations`;

  useEffect(() => {
    const fetchData = async () => {
      const biosampledata = await fetch(biosamplesapiUrl);
      const observationsdata = await fetch(observationsapiUrl);

      setBiosamples(await biosampledata.json());
      setObservations(await observationsdata.json());
      setLoading(false);
    };

    fetchData();
  },[biosamplesapiUrl, observationsapiUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Calculate the average coordinates for centering the map
  const avgLat = biosamples.reduce((sum, marker) => sum + marker.latitude, 0) / biosamples.length;
  const avgLng = biosamples.reduce((sum, marker) => sum + marker.longitude, 0) / biosamples.length;
  const uniqueSpecies = [...new Set(biosamples.map(marker => marker.species))];

  const handleFilter = () => {
/**   const filteredData = observations.filter(observation => ((observation.temperature >= minTemperature) && (observation.temperature <= maxTemperature)) ) */
const filteredData = observations.filter(observation => observation.temperature === 28) 
    setFilteredMarkers(filteredData);
    console.log(filteredData)
    console.log(minTemperature)
  };



  return (

    <div>
    <TemperatureFilter
      minTemperature={minTemperature}
      maxTemperature={maxTemperature}
      onFilter={handleFilter}
      setMinTemperature={setMinTemperature}
      setMaxTemperature={setMaxTemperature}
    />
    
        <MapContainer center={[avgLat, avgLng]} zoom={3} style={{ height: '800px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />


          <LayersControl position="topright">

          {uniqueSpecies.map(species => (
          <LayersControl.Overlay checked name={species}>
            <LayerGroup>
            <MarkerClusterGroup>
                {biosamples.filter(marker => marker.species === species).map((marker) => (
                  
                    <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
                      <Popup>
                            <div>
                                <p>ID: {marker.id}</p>
                                <p>Species: {marker.species}</p>
                                <p>Collection Date: {marker.collection_date}</p>
                                <p>Temperature: {marker.temperature}</p>
                            </div>
                      </Popup>
                    </Marker>
                ))}
                </MarkerClusterGroup>
            </LayerGroup>
          </LayersControl.Overlay>
          ))
      }
        </LayersControl>

      


        </MapContainer>
  </div>
    
  );
};

export default AppMap;