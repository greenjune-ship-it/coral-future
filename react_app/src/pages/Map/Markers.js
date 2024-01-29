import React from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Marker, Popup, LayerGroup } from 'react-leaflet';

const Markers = ({ markers }) => (
  <LayerGroup>
    <MarkerClusterGroup>
      {markers.map(marker => (
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
);

export default Markers;
