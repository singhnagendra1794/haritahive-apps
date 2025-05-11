import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Learn from './Learn';
import Projects from './Projects'; // Make sure this import is here

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => map.remove();
  }, []);

  return <div id="map" ref={mapRef} className="w-full h-96"></div>;
};

const Home = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-3xl font-bold mb-4">Welcome to HaritaHive!</h2>
    <p className="text-lg mb-4">A fun place to learn and play with maps!</p>
    <div className="mb-4">
      <h3 className="text-xl font-semibold">Explore a Map</h3>
      <Map />
    </div>
    {/* Created By Section */}
    <div className="mb-4">
      <p className="text-lg">
        Created By:{' '}
        <a
          href="https://www.linkedin.com/in/singhnagendra1/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Nagendra Singh
        </a>
      </p>
    </div>
    {/* About Me Section */}
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">About Me</h3>
      <p className="text-lg">
        Head of Geospatial | Cloud GIS & Big Data | AI/ML for Geospatial Analytics | Climate & ESG Analytics | Python, GEE | Location Intelligence | Remote Sensing | Helping simplify spatial data for everyone
      </p>
    </div>
  </div>
);

const App = () => (
  <Router>
    <div>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">HaritaHive</h1>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
            <li><Link to="/learn" className="text-white hover:text-gray-200">Learn</Link></li>
            <li><Link to="/projects" className="text-white hover:text-gray-200">Projects</Link></li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/projects" element={<Projects />} /> {/* Make sure this route is here */}
        {/* Optional: Add a catch-all route for unmatched paths */}
        <Route path="*" element={<div className="container mx-auto p-4">Page Not Found</div>} />
      </Routes>
    </div>
  </Router>
);

export default App;