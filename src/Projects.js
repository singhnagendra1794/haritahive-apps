import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from './AuthContext';

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
  const { subscription } = useAuth();

  useEffect(() => {
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapInstanceRef.current = map;

      map.on('click', (e) => {
        if (markers.length < 2) {
          const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        } else {
          alert('You can only add 2 markers for distance calculation. Click "Clear Markers" to start over.');
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const calculateDistance = () => {
    if (markers.length === 2) {
      const latlng1 = L.latLng(markers[0].lat, markers[0].lng);
      const latlng2 = L.latLng(markers[1].lat, markers[1].lng);
      const distanceInMeters = latlng1.distanceTo(latlng2);
      const distanceInKm = (distanceInMeters / 1000).toFixed(2);
      setDistance(distanceInKm);
    } else {
      alert('Please add exactly 2 markers to calculate the distance.');
    }
  };

  const clearMarkers = () => {
    setMarkers([]);
    setDistance(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });
    }
  };

  const isPremium = subscription && subscription.status === 'active';

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Create Your Map Projects</h2>
      <p className="text-lg mb-4">
        Click on the map to add up to 2 markers, then calculate the distance between them! (Distance calculation requires a premium subscription.)
      </p>
      <div
        id="projectMap"
        ref={mapRef}
        style={{ height: '400px', width: '100%' }}
        className="mb-4 border border-gray-300"
      ></div>
      <div className="mb-4">
        <button
          onClick={calculateDistance}
          disabled={!isPremium}
          className={`px-4 py-2 rounded text-white mr-2 ${
            isPremium
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
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