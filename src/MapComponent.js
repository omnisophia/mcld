// src/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'; // Optional for custom styles

const MapComponent = ({ liveDataSource, theme }) => {
  const [data, setData] = useState([]);
  const [mapType, setMapType] = useState('google'); // Default to Google Maps

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(liveDataSource);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching live data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [liveDataSource]);

  const renderMap = () => {
    const center = { lat: 32.76310290371525, lng: -97.06539263782439 }; // Default center 32.76310290371525, -97.06539263782439
    const zoom = 13; // Default zoom level

    if (mapType === 'google') {
      return (
        <LoadScript googleMapsApiKey="YOURAPIKEY">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={zoom}
          >
            {/* Add markers or data representation here */}
          </GoogleMap>
        </LoadScript>
      );
    } else if (mapType === 'openstreetmap') {
      return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Add markers or data representation here */}
        </MapContainer>
      );
    }
  };

  return (
    <div className={`map-component ${theme}`}>
      {renderMap()}
      {/* Render live data here, e.g., markers based on fetched data */}
      {/* Example: data.map((item) => <Marker key={item.id} position={[item.lat, item.lng]} />) */}
    </div>
  );
};

export default MapComponent;
