import React, { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'; // GrapesJS styling
import 'grapesjs-preset-webpage'; // Preset for default components
import Swal from 'sweetalert2';
import axios from 'axios';

const LandingPageBuilder = () => {
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
          'https://unpkg.com/framer-motion/dist/framer-motion.js',
        ],
      },
    });

    // Add custom components
    editor.BlockManager.add('hero-section', {
      label: 'Hero Section',
      content: `
        <section class="bg-blue-600 text-white h-screen flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-4xl font-bold">Welcome to Our Landing Page</h1>
            <p class="mt-4">Join us and explore the best products and services.</p>
            <button class="bg-white text-blue-600 font-bold py-2 px-4 rounded mt-4">Get Started</button>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('product-section', {
      label: 'Product Section',
      content: `
        <section class="py-12">
          <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-6">Our Products</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Product 1</h3>
                <p class="mt-2">Description of product 1.</p>
                <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Buy Now</button>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Product 2</h3>
                <p class="mt-2">Description of product 2.</p>
                <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Buy Now</button>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Product 3</h3>
                <p class="mt-2">Description of product 3.</p>
                <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Buy Now</button>
              </div>
            </div>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('features-section', {
      label: 'Features Section',
      content: `
        <section class="py-12 bg-gray-100">
          <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-6">Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Feature 1</h3>
                <p class="mt-2">Details about feature 1.</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Feature 2</h3>
                <p class="mt-2">Details about feature 2.</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Feature 3</h3>
                <p class="mt-2">Details about feature 3.</p>
              </div>
            </div>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('call-to-action', {
      label: 'Call to Action',
      content: `
        <section class="bg-blue-600 text-white text-center py-12">
          <h2 class="text-3xl font-bold">Ready to get started?</h2>
          <button class="bg-white text-blue-600 font-bold py-2 px-4 rounded mt-4">Sign Up Now</button>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('image-slider', {
      label: 'Image Slider',
      content: `
        <div class="relative">
          <div class="absolute inset-0 overflow-hidden">
            <div class="h-full w-full">
              <img src="https://via.placeholder.com/800x400" alt="Slider Image 1" class="w-full h-full object-cover">
            </div>
            <div class="h-full w-full">
              <img src="https://via.placeholder.com/800x400" alt="Slider Image 2" class="w-full h-full object-cover">
            </div>
            <div class="h-full w-full">
              <img src="https://via.placeholder.com/800x400" alt="Slider Image 3" class="w-full h-full object-cover">
            </div>
          </div>
          <button class="absolute top-1/2 left-4 bg-gray-800 text-white rounded-full p-2">❮</button>
          <button class="absolute top-1/2 right-4 bg-gray-800 text-white rounded-full p-2">❯</button>
        </div>
      `,
      category: 'Sections',
    });

    // Additional Components
    editor.BlockManager.add('testimonial-section', {
      label: 'Testimonial Section',
      content: `
        <section class="py-12 bg-gray-200">
          <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-6">What Our Clients Say</h2>
            <div class="flex flex-col md:flex-row">
              <div class="bg-white p-6 rounded-lg shadow m-4 flex-1">
                <p>"Amazing service! Highly recommended."</p>
                <p class="font-semibold mt-4">- John Doe</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow m-4 flex-1">
                <p>"A fantastic experience from start to finish."</p>
                <p class="font-semibold mt-4">- Jane Smith</p>
              </div>
            </div>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('faq-section', {
      label: 'FAQ Section',
      content: `
        <section class="py-12 bg-gray-100">
          <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div class="bg-white p-6 rounded-lg shadow mb-4">
              <h3 class="font-semibold">Question 1?</h3>
              <p>Answer to question 1.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow mb-4">
              <h3 class="font-semibold">Question 2?</h3>
              <p>Answer to question 2.</p>
            </div>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('blog-section', {
      label: 'Blog Section',
      content: `
        <section class="py-12">
          <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-6">Latest Articles</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Blog Post 1</h3>
                <p class="mt-2">Short description of blog post 1.</p>
                <a href="#" class="text-blue-600 mt-4 inline-block">Read More</a>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Blog Post 2</h3>
                <p class="mt-2">Short description of blog post 2.</p>
                <a href="#" class="text-blue-600 mt-4 inline-block">Read More</a>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Blog Post 3</h3>
                <p class="mt-2">Short description of blog post 3.</p>
                <a href="#" class="text-blue-600 mt-4 inline-block">Read More</a>
              </div>
            </div>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('team-section', {
      label: 'Team Section',
      content: `
        <section class="py-12 bg-gray-200">
          <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Team Member 1</h3>
                <p>Role of team member 1.</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Team Member 2</h3>
                <p>Role of team member 2.</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Team Member 3</h3>
                <p>Role of team member 3.</p>
              </div>
            </div>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    editor.BlockManager.add('pricing-table', {
      label: 'Pricing Table',
      content: `
        <section class="py-12 bg-white">
          <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-6">Pricing Plans</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gray-100 p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Basic Plan</h3>
                <p class="mt-2">$19/month</p>
                <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Choose Plan</button>
              </div>
              <div class="bg-gray-100 p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Standard Plan</h3>
                <p class="mt-2">$39/month</p>
                <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Choose Plan</button>
              </div>
              <div class="bg-gray-100 p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold">Premium Plan</h3>
                <p class="mt-2">$59/month</p>
                <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Choose Plan</button>
              </div>
            </div>
          </div>
        </section>
      `,
      category: 'Sections',
    });

    // Function to handle save button click
    const saveContent = async () => {
      const htmlContent = editor.getHtml();
      const cssContent = editor.getCss();

      try {
        // Make a POST request to your API
        const response = await axios.post('/landing-page', {
          html: htmlContent,
          css: cssContent,
        });

        // Check if the response indicates success
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Saved Successfully!',
            text: 'Your landing page content has been saved.',
            showConfirmButton: true,
          });
        } else {
          throw new Error('Save failed');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: 'An error occurred while saving. Please try again.',
          showConfirmButton: true,
        });
      }
    };

    // Add a save button
   

    // Add a save button
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.className = 'bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4';
    saveButton.onclick = saveContent;
    document.getElementById('gjs').appendChild(saveButton);
  });

  const [title ,setTitle] = useState();
 

  
	// template_id 	slug 	id 	title 	custom_data 	is_published 
  return (
    <div id="gjs" className="border h-full"></div> // GrapesJS editor container
  );
};

export default LandingPageBuilder;
