import React, { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'; // GrapesJS styling
import 'grapesjs-preset-webpage'; // Preset for default components
import Swal from 'sweetalert2';
import axios from 'axios';
import { CustomComponents } from './Components';
import { template } from 'lodash';
import ButtonComponents from './Data/ButtonComponents';
import CardComponents from './Data/CardComponents';
import FeatureComponents from './Data/FeatureComponents';
import FooterComponents from './Data/FooterComponents';
import NavbarComponents from './Data/NavbarComponents';
import HeroComponents from './Data/HeroComponents';

const EditLandingPage = ({ slug }) => {
  const [id, setId] = useState();
  const [title, setTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [editor, setEditor] = useState(null); // State to hold the editor instance

  useEffect(() => {
    // Fetch existing landing page data
    const fetchLandingPageData = async () => {
      try {
        const response = await axios.get(`/landing-pages/${slug}`); // Adjust the URL as necessary
        const { id ,title , html, isPublished } = response.data.landing_page;
        setId(id);
        setTitle(title);
        setIsPublished(isPublished);

        // Initialize GrapesJS editor with existing content
        const editorInstance = grapesjs.init({
          container: '#gjs',
          fromElement: false,
          width: 'auto',
          height: '100vh',
          storageManager: false,
          plugins: ['gjs-preset-webpage',
            CustomComponents,
            HeroComponents,
            ButtonComponents,
            CardComponents,
            FeatureComponents,
            FooterComponents,
            NavbarComponents,
          ],
          pluginsOpts: {
            'gjs-preset-webpage': {},
          },
          canvas: {
            styles: [
              'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
              'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
              'https://unpkg.com/framer-motion/dist/framer-motion.js',
            ],
          },
        });

        // Load existing content into the editor
        editorInstance.setComponents(html); // Set HTML content to GrapesJS

        // Store the editor instance in state
        setEditor(editorInstance);
      } catch (error) {
        console.error('Error fetching landing page data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch landing page data.',
        });
      }
    };

    fetchLandingPageData();
  }, [slug]);

  // Save the modified landing page
  const handleSave = async () => {
    if (!editor) return; // Ensure editor is initialized
    const content = editor.getHtml(); // Get the HTML content
    const updatedData = { title, content, isPublished, template_id: 1 }; // Create payload for saving

    try {
      const response = await axios.put(`/landing-pages/${id}`, updatedData); // Adjust the URL as necessary
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Landing page updated successfully.',
      });
    } catch (error) {
      console.error('Error saving landing page:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save landing page.',
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Landing Page</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Page Title"
        className="border p-2 mb-4 w-full"
      />
      <div id="gjs" className="border h-full"></div>
      <button
        id="save-button"
        onClick={handleSave} // Call handleSave without passing editor instance
        className="bg-blue-600 text-white font-bold py-2 px-4 mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditLandingPage;
