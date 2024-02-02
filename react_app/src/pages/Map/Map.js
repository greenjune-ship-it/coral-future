// External imports
import React, { useEffect, useState, useContext } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
import { BioSamplesFilterContext } from 'contexts/BioSamplesFilterContext'
import Markers from 'components/Markers/Markers';
import filterBioSamples from 'utils/filterBioSamples';


// To adjust map center and zoom to selection
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

const Map = () => {
  const { allBioSamples, filters, filteredBioSamples, setFilteredBioSamples } = useContext(BioSamplesFilterContext);
  const [mapCenter, setMapCenter] = useState(null);

  
  useEffect(() => {
    if (allBioSamples && allBioSamples.length > 0) {
      let dataToSet = allBioSamples;

      // Only apply the filter if filters are set
      if (filters && Object.keys(filters).length > 0) {
        dataToSet = filterBioSamples(filters, allBioSamples);
      }
      // Recalculate map center based on selection
      const avgLat = dataToSet.reduce((sum, marker) => sum + marker.latitude, 0) / dataToSet.length;
      const avgLng = dataToSet.reduce((sum, marker) => sum + marker.longitude, 0) / dataToSet.length;

      setMapCenter([avgLat, avgLng]);
      setFilteredBioSamples(dataToSet);
    }
  }, [filters, allBioSamples]);


  return (
    mapCenter ?
      <MapContainer center={mapCenter} zoom={3} style={{ height: '100%', minHeight: '100%', width: '100%' }}>
        <ChangeView markers={filteredBioSamples} />
        <TileLayer
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          attribution='Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />
        <Markers biosamples={filteredBioSamples} />
      </MapContainer>
      :
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </div>
  );
};

export default Map;
