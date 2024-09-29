import React from 'react';
import PageBuilder from './PageBuilder';
import axios from 'axios';

const MyPage = () => {
  const handleSave = (html, css) => {
    // Save the page content to the backend (Laravel)
    axios.post('/api/save-page', { html, css })
      .then(response => {
        console.log('Page saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving the page:', error);
      });
  };

  return (
    <div className="h-screen">
      <PageBuilder onSave={handleSave} />
    </div>
  );
};

export default MyPage;
