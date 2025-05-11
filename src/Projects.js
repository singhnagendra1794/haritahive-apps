import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue (same as in App.js)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Projects = () => {
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized yet
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Store map instance in ref
      mapInstanceRef.current = map;

      // Add click event to add markers
      map.on('click', (e) => {
        if (markers.length < 2) { // Limit to 2 markers
          const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        } else {
          alert('You can only add 2 markers for distance calculation. Click "Clear Markers" to start over.');
        }
      });
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once on mount

  // Calculate distance between two markers
  const calculateDistance = () => {
    if (markers.length === 2) {
      const latlng1 = L.latLng(markers[0].lat, markers[0].lng);
      const latlng2 = L.latLng(markers[1].lat, markers[1].lng);
      const distanceInMeters = latlng1.distanceTo(latlng2); // Distance in meters
      const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Convert to kilometers, round to 2 decimals
      setDistance(distanceInKm);
    } else {
      alert('Please add exactly 2 markers to calculate the distance.');
    }
  };

  // Clear markers and reset distance
  const clearMarkers = () => {
    setMarkers([]);
    setDistance(null);
    // Remove existing markers from the map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Create Your Map Projects</h2>
      <p className="text-lg mb-4">
        Click on the map to add up to 2 markers, then calculate the distance between them!
      </p>
      <div
        id="projectMap"
        ref={mapRef}
        style={{ height: '400px', width: '100%' }} // Explicit height and width
        className="mb-4 border border-gray-300"
      ></div>
      <div className="mb-4">
        <button
          onClick={calculateDistance}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Calculate Distance
        </button>
        <button
          onClick={clearMarkers}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Markers
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Markers</h3>
        {markers.length === 0 ? (
          <p className="text-lg">No markers added yet. Click on the map to add some!</p>
        ) : (
          <ul className="list-disc list-inside">
            {markers.map((marker, index) => (
              <li key={index} className="text-lg">
                Place {index + 1}: Lat {marker.lat.toFixed(2)}, Lng {marker.lng.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        {distance && (
          <p className="text-lg mt-4">
            Distance between markers: <strong>{distance} km</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;