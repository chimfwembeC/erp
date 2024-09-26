import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLandingPageSelector = () => {
  const [landingPages, setLandingPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    // Fetch available landing pages from the API
    axios.get('/api/landing-pages')
      .then(response => setLandingPages(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSelection = (id) => {
    setSelectedPage(id);
  };

  const saveSelection = () => {
    // Save the selected landing page through API
    axios.post('/api/admin/save-landing-page', { selectedLandingPage: selectedPage })
      .then(response => alert('Landing page selection saved!'))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Select a Landing Page</h1>
      <div className="grid grid-cols-3 gap-4">
        {landingPages.map((page) => (
          <div key={page.id} className={`p-4 border rounded-lg ${selectedPage === page.id ? 'border-blue-500' : ''}`}>
            <h3 className="text-xl font-semibold">{page.name}</h3>
            <p>{page.description}</p>
            <button onClick={() => handleSelection(page.id)} className="bg-blue-500 text-white mt-4 px-4 py-2 rounded">
              Select this Page
            </button>
          </div>
        ))}
      </div>
      <button onClick={saveSelection} className="bg-green-500 text-white mt-6 px-6 py-3 rounded">
        Save Selection
      </button>
    </div>
  );
};

export default AdminLandingPageSelector;
