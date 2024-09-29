import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Section from './Section';

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{landingPage.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: landingPage.custom_data }} className="mb-8" />

      {sections.map((section) => (
        // <div key={section.id} className="border-b border-gray-300 py-4">
        //   <h2 className="text-xl font-semibold">{section.name}</h2>
        //   <div dangerouslySetInnerHTML={{ __html: section.custom_data }} />
        // </div>
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
};

export default LandingPage;
