import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'; // GrapesJS styling
import 'grapesjs-preset-webpage'; // Preset for default components

const PageBuilder = ({ onSave }) => {
  useEffect(() => {
    // Initialize GrapesJS editor
    const editor = grapesjs.init({
      container: '#gjs', // Target the div for mounting
      fromElement: false, // We're building the HTML in the editor
      width: 'auto',
      height: '100vh',
      storageManager: false, // Disable built-in storage (using custom save logic)
      plugins: ['gjs-preset-webpage'], // Use preset webpage blocks
      pluginsOpts: {
        'gjs-preset-webpage': {}, // Default options
      },
      canvas: {
        styles: [
          // Inject TailwindCSS CDN
          'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
          'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
          'https://unpkg.com/framer-motion/dist/framer-motion.js'
        ],
      },
    });

    // Add a custom save button in the GrapesJS panel
    editor.Panels.addButton('options', {
      id: 'save-button',
      className: 'fa fa-save',
      command: () => {
        const html = editor.getHtml();
        const css = editor.getCss();
        onSave(html, css); // Call the onSave prop to handle saving
      },
      attributes: { title: 'Save' },
    });

    return () => editor.destroy(); // Cleanup when component unmounts
  }, [onSave]);

  return (
    <div className="h-screen">
      <div id="gjs" className="h-full w-full" />
    </div>
  );
};

export default PageBuilder;
