// components.ts
import grapesjs from 'grapesjs';

export const CustomComponents = (editor: grapesjs.Editor) => {
  // Hero Section
  editor.BlockManager.add('hero-section', {
    label: 'Hero Section',
    content: `
      <section class="bg-blue-500 text-white p-10">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-4xl font-bold mb-4">Welcome to Our ERP Solution</h2>
          <p class="text-lg mb-6">Revolutionize your business with our integrated platform.</p>
          <a href="#" class="bg-white text-blue-500 py-2 px-4 rounded">Get Started</a>
        </div>
      </section>
    `,
  });

  // Button Component
  editor.BlockManager.add('button', {
    label: 'Button',
    content: `
      <a href="#" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Button</a>
    `,
  });

  // Full Landing Page Component
  editor.BlockManager.add('full-landing-page', {
    label: 'Full Landing Page',
    content: `
      <div class="min-h-screen bg-gray-100 flex flex-col">
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900">ERP Solution</h1>
          </div>
        </header>
        <main class="flex-grow flex flex-col justify-center items-center bg-white py-20">
          <h2 class="text-5xl font-extrabold text-gray-800 mb-4">Revolutionize Your Business</h2>
          <p class="text-lg text-gray-600 mb-6">Integrate all your processes into one powerful platform.</p>
          <a href="#" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Get Started</a>
        </main>
      </div>
    `,
  });

  // Responsive Layout Component
  editor.BlockManager.add('responsive-layout', {
    label: 'Responsive Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div class="bg-white p-6 rounded-lg shadow">
          <h4 class="font-semibold text-xl mb-2">Column 1</h4>
          <p class="text-gray-600">Content for column 1.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h4 class="font-semibold text-xl mb-2">Column 2</h4>
          <p class="text-gray-600">Content for column 2.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h4 class="font-semibold text-xl mb-2">Column 3</h4>
          <p class="text-gray-600">Content for column 3.</p>
        </div>
      </div>
    `,
  });

  // Slider Component
  editor.BlockManager.add('slider', {
    label: 'Slider',
    content: `
      <div class="relative">
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300" style="transform: translateX(0%);">
            <img src="https://via.placeholder.com/800x400/1" class="w-full">
            <img src="https://via.placeholder.com/800x400/2" class="w-full">
            <img src="https://via.placeholder.com/800x400/3" class="w-full">
          </div>
        </div>
        <div class="absolute inset-y-0 left-0 flex items-center">
          <button class="bg-white rounded-full p-2">←</button>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center">
          <button class="bg-white rounded-full p-2">→</button>
        </div>
      </div>
    `,
  });

  // Partners Section
  editor.BlockManager.add('partners-section', {
    label: 'Partners Section',
    content: `
      <section class="py-10">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-2xl font-bold mb-4">Our Partners</h2>
          <div class="flex flex-wrap justify-center space-x-4">
            <img src="https://via.placeholder.com/100x50" alt="Partner 1" class="m-2">
            <img src="https://via.placeholder.com/100x50" alt="Partner 2" class="m-2">
            <img src="https://via.placeholder.com/100x50" alt="Partner 3" class="m-2">
          </div>
        </div>
      </section>
    `,
  });

  // Team Clients Section
  editor.BlockManager.add('team-clients-section', {
    label: 'Team Clients Section',
    content: `
      <section class="py-10 bg-gray-100">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-2xl font-bold mb-4">Our Clients</h2>
          <div class="flex flex-wrap justify-center">
            <div class="bg-white p-4 rounded-lg shadow m-2">
              <h4 class="font-semibold">Client Name</h4>
              <p>Client description.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow m-2">
              <h4 class="font-semibold">Client Name</h4>
              <p>Client description.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow m-2">
              <h4 class="font-semibold">Client Name</h4>
              <p>Client description.</p>
            </div>
          </div>
        </div>
      </section>
    `,
  });

  // Payment Section
  editor.BlockManager.add('payment-section', {
    label: 'Payment Section',
    content: `
      <section class="py-10">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-2xl font-bold mb-4">Secure Payment Options</h2>
          <div class="flex justify-center space-x-4">
            <img src="https://via.placeholder.com/50x30" alt="PayPal" class="m-2">
            <img src="https://via.placeholder.com/50x30" alt="Visa" class="m-2">
            <img src="https://via.placeholder.com/50x30" alt="Mastercard" class="m-2">
          </div>
        </div>
      </section>
    `,
  });

  // Dropdown Menu Component
  editor.BlockManager.add('dropdown-menu', {
    label: 'Dropdown Menu',
    content: `
      <div class="relative inline-block text-left">
        <div>
          <button class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="true" aria-haspopup="true">
            Options
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 1</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 2</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Option 3</a>
          </div>
        </div>
      </div>
    `,
  });

  // Color Swatches Component
  editor.BlockManager.add('color-swatches', {
    label: 'Color Swatches',
    content: `
      <div class="flex space-x-2">
        <div class="h-8 w-8 bg-red-500 rounded-full cursor-pointer"></div>
        <div class="h-8 w-8 bg-blue-500 rounded-full cursor-pointer"></div>
        <div class="h-8 w-8 bg-green-500 rounded-full cursor-pointer"></div>
      </div>
    `,
  });

  // Card Component
  editor.BlockManager.add('card-component', {
    label: 'Card Component',
    content: `
      <div class="bg-white rounded-lg shadow p-6">
        <img src="https://via.placeholder.com/150" alt="Card Image" class="w-full h-40 object-cover mb-4">
        <h3 class="text-xl font-semibold mb-2">Card Title</h3>
        <p class="text-gray-600">Some descriptive text goes here.</p>
      </div>
    `,
  });

  // Two-Column Layout
  editor.BlockManager.add('two-column-layout', {
    label: 'Two-Column Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div class="bg-white p-6 rounded-lg shadow">Column 1 Content</div>
        <div class="bg-white p-6 rounded-lg shadow">Column 2 Content</div>
      </div>
    `,
  });

  // Three-Column Layout
  editor.BlockManager.add('three-column-layout', {
    label: 'Three-Column Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div class="bg-white p-6 rounded-lg shadow">Column 1 Content</div>
        <div class="bg-white p-6 rounded-lg shadow">Column 2 Content</div>
        <div class="bg-white p-6 rounded-lg shadow">Column 3 Content</div>
      </div>
    `,
  });
};

// Ensure you import this component file in your main GrapesJS setup.
