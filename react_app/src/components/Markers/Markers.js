import React from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Marker, Popup, LayerGroup } from 'react-leaflet';
// Import for fixing the issue with finding marker icons
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

const Markers = ({ colonies }) => {
  return (
    <LayerGroup>
      <MarkerClusterGroup>
        {colonies && Array.isArray(colonies) && colonies.map(colony => (
          <Marker key={colony.id} position={[colony.latitude, colony.longitude]}>
            <Popup>
              <div>
                <p>ID: {colony.id}</p>
                <p>Name: {colony.name}</p>
                <p>Species: {colony.species}</p>
                <p>Coordinates: {colony.latitude} {colony.longitude}</p>
                <p>ED50: {colony.ed50_value}</p>
                <p>Thermal Tolerance {colony.thermal_tolerance}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </LayerGroup>
  );
};

export default Markers;