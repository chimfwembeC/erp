import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayPage = ({ pageId }) => {
  const [pageData, setPageData] = useState({ html: '', css: '' });

  useEffect(() => {
    // Fetch the saved page from backend
    axios
      .get(`/api/page/${pageId}`)
      .then((response) => {
        setPageData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching page:', error);
      });
  }, [pageId]);

  return (
    <div>
      <style>{pageData.css}</style> {/* Inject CSS */}
      <div dangerouslySetInnerHTML={{ __html: pageData.html }} /> {/* Render HTML */}
    </div>
  );
};

export default DisplayPage;
