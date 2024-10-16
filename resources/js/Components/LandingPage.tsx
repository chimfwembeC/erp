import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Section from './Section';
import { Head } from '@inertiajs/react';

const LandingPage = ({ slug }) => {
  const [landingPage, setLandingPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLandingPage = async () => {
      try {
        const response = await axios.get(`/landing-pages/${slug}`);
        setLandingPage(response.data.landing_page);
        setSections(response.data.sections);
      } catch (err) {
        setError('Failed to load landing page.');
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPage();
  }, [slug]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="">
      <Head title={landingPage.title} />

      {/* Render the full custom HTML content */}
      {error && (
        <div className="h-screen">
          Error Occured or page not found
        </div>
      )}
      <div 
        dangerouslySetInnerHTML={{ __html: landingPage.html }} 
        className="mb-8" 
      />         
    </div>
  );
};

export default LandingPage;
