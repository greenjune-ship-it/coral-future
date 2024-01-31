import React from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Marker, Popup, LayerGroup } from 'react-leaflet';
// Import for fixing the issue with finding marker icons
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

const Markers = ({ biosamples }) => {
  return (
    <LayerGroup>
      <MarkerClusterGroup>
        {biosamples && Array.isArray(biosamples) && biosamples.map(biosample => (
          <Marker key={biosample.id} position={[biosample.latitude, biosample.longitude]}>
            <Popup>
              <div>
                <p>ID: {biosample.id}</p>
                <p>Species: {biosample.species}</p>
                <p>Collection Date: {biosample.collection_date}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </LayerGroup>
  );
};

export default Markers;