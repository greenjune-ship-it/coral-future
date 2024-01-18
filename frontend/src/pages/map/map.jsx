import { MapContainer, TileLayer,Rectangle, LayersControl, Marker, Popup, Circle, FeatureGroup, LayerGroup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './map.css';
import NavBarbt from '../../elements/NavBar/navbarbt.jsx'
import Badge from 'react-bootstrap/Badge';

const Map = () => {
    const center = [51.505, -0.09]
    const rectangle = [
        [51.49, -0.08],
        [51.5, -0.06],
    ]
    const Mapinfo1 = "Some Info 1"
    const Maponfo2 = "Some info 2"


    return(
        <>
        <NavBarbt/>
            <div class="mapinformation">
                <h1>
                    Discover Corals on the WorldMap <Badge bg="secondary">New</Badge>
                </h1>

            </div>
            <div class="map">
                    <MapContainer center={[51.505, -0.09]} id="mapId" zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
            </div>
    
        </>
    );
    
};

export default Map;