import React from 'react';

const Learn = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-3xl font-bold mb-4">Learn Geospatial Skills</h2>
    <p className="text-lg mb-4">Watch videos and read guides to become a map expert!</p>

    {/* Embedded YouTube Video */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Video: How to Install QGIS, Python and Anaconda Distribution</h3>
      <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/3w308TTUVco?si=4uRQW73pnUiPMOaR"
          title="How to Install QGIS, Python and Anaconda Distribution"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>

    {/* Simple Guide */}
    <div>
      <h3 className="text-xl font-semibold mb-2">Guide: What is a Map?</h3>
      <p className="text-lg">
        A map is like a picture of the world! It shows places like roads, rivers, and cities. Maps help us find where things are and learn about our planet. For example, a map can show where your school is or where animals live.
      </p>
    </div>
  </div>
);

export default Learn;