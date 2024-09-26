// src/App.js
import React from 'react';
import MapComponent from './MapComponent';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapComponent
        mapType="openstreetmap" // or "google"
        liveDataSource="YOUR_LIVE_DATA_API_ENDPOINT"
        theme="light" // or "dark"
      />
    </div>
  );
}

export default App;

