// AppMap.js
import React, { useEffect, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

const AppMap = ({ backendUrl }) => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `${backendUrl}/api/biosamples`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setMarkers(data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      });
  }, [backendUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Calculate the average coordinates for centering the map
  const avgLat = markers.reduce((sum, marker) => sum + marker.latitude, 0) / markers.length;
  const avgLng = markers.reduce((sum, marker) => sum + marker.longitude, 0) / markers.length;

  return (
    <MapContainer center={[avgLat, avgLng]} zoom={3} style={{ height: '800px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {markers.map(marker => (
          <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
            <Popup>
              <div>
                <p>ID: {marker.id}</p>
                <p>Species: {marker.species}</p>
                <p>Collection Date: {marker.collection_date}</p>
                {/* Add more information as needed */}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default AppMap;