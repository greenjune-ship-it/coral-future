// External imports
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
import Markers from 'components/Markers/Markers';
import filterBioSamples from 'utils/filterBioSamples';


const ChangeView = ({ markers }) => {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = new L.LatLngBounds(markers.map(marker => [marker.latitude, marker.longitude]));
      map.fitBounds(bounds);
    }
  }, [markers, map]);
  return null;
}

const Map = ({ biosamples, filters }) => {
  const [filteredBioSamples, setFilteredBioSamples] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);


  useEffect(() => {
    if (biosamples && biosamples.length > 0) {
      let dataToSet = biosamples;

      // Only apply the filter if filters are set
      if (filters && Object.keys(filters).length > 0) {
        dataToSet = filterBioSamples(filters, biosamples);
      }
      // Recalculate map center based on selection
      const avgLat = dataToSet.reduce((sum, marker) => sum + marker.latitude, 0) / dataToSet.length;
      const avgLng = dataToSet.reduce((sum, marker) => sum + marker.longitude, 0) / dataToSet.length;

      setMapCenter([avgLat, avgLng]);
      setFilteredBioSamples(dataToSet);
      console.log('TypeOf:', typeof dataToSet);
      console.log('DataToSet:',dataToSet);
      sessionStorage.setItem("FilteredBioSamples", JSON.stringify(dataToSet));
    }
  }, [filters, biosamples]);


  return (
    mapCenter ?
      <MapContainer center={mapCenter} zoom={3} style={{ height: '600px', width: '100%' }}>
        <ChangeView markers={filteredBioSamples} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers biosamples={filteredBioSamples} />
      </MapContainer>
      :
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px', width: '100%' }}>
        <Spinner />

      </div>
  );
};

export default Map;
