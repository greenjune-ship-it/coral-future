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
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </LayerGroup>
  );
};

export default Markers;