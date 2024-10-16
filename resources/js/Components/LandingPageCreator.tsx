import React, { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'; // GrapesJS styling
import 'grapesjs-preset-webpage'; // Preset for default components
import Swal from 'sweetalert2';
import axios from 'axios';
import { CustomComponents } from './Components';
import HeroComponents from './Data/HeroComponents';
import ButtonComponents from './Data/ButtonComponents';
import PricingComponents from './Data/PricingComponents';
import ResponsiveLayoutComponents from './Data/ResponsiveLayoutComponents';
import CardComponents from './Data/CardComponents';
import FooterComponents from './Data/FooterComponents';
import FeatureComponents from './Data/FeatureComponents';
import NavbarComponents from './Data/NavbarComponents';

const LandingPageBuilder = () => {
  const [templateId, setTemplateId] = useState('');
  const [title, setTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    // Initialize GrapesJS editor
    const editor = grapesjs.init({
      container: '#gjs', // Target the div for mounting
      fromElement: false, // We're building the HTML in the editor
      width: 'auto',
      height: '100vh',
      storageManager: false, // Disable built-in storage (using custom save logic)
      plugins: [
        'gjs-preset-webpage', 
        HeroComponents,
        ButtonComponents,
        PricingComponents,
        ResponsiveLayoutComponents,
        CardComponents,
        FooterComponents,
        FeatureComponents,
        NavbarComponents
        
      ], // Use preset webpage blocks
      pluginsOpts: {
        'gjs-preset-webpage': {}, // Default options
      },
      canvas: {
        styles: [
          // Inject TailwindCSS CDN
          'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
          '<link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css">',
          'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
          'https://unpkg.com/framer-motion/dist/framer-motion.js',
        ],
      },
    });

     

    // Function to handle save
    const handleSave = async () => {
      const htmlContent = editor.getHtml();
      const cssContent = editor.getCss();

      try {
        const response = await axios.post('/landing-pages', {
          template_id: templateId,
          title,
          is_published: isPublished,
          html: htmlContent,
          css: cssContent,
        });

        if (response.status === 200) {
          Swal.fire('Success', 'Landing page saved successfully!', 'success');
        }
      } catch (error) {
        Swal.fire('Error', 'There was an error saving the landing page.', 'error');
      }
    };

    // Event listener for save button
    document.getElementById('save-button').addEventListener('click', handleSave);

    // Cleanup event listener on component unmount
    return () => {
      document.getElementById('save-button').removeEventListener('click', handleSave);
    };
  }, [templateId, title, isPublished]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span col-span-1 border border-2 rounded-lg p-4">
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2" htmlFor="template-id">Template ID:</label>
            <input
              type="text"
              id="template-id"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-bold mb-2" htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="is-published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="is-published" className="font-bold">Is Published:</label>
          </div>
        </div>

        <div className="col-span col-span-2">
         

          <div className=""></div>
        </div>
      </div>
     
      <div id="gjs" className="border-2 border-gray-300 mt-4"></div>
      <button id="save-button" className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Save Landing Page
          </button>
    </div>
  );
};

export default LandingPageBuilder;
