import React from 'react';
import DisplayPage from './DisplayPage';

const PageViewer = () => {
  const pageId = 1; // Dynamically set the page ID (could come from the URL or state)

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Saved Page</h1>
      <DisplayPage pageId={pageId} />
    </div>
  );
};

export default PageViewer;
