import React from 'react';
import grapesjs from 'grapesjs';

export default function ButtonComponents(editor: grapesjs.Editor) {
  // Blue button
  editor.BlockManager.add('blue-button', {
    label: 'Blue Button',
    content: `
      <a href="#" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Blue Button</a>
    `,
  });

  // Indigo button
  editor.BlockManager.add('indigo-button', {
    label: 'Indigo Button',
    content: `
      <a href="#" class="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">Indigo Button</a>
    `,
  });

  // Orange button
  editor.BlockManager.add('orange-button', {
    label: 'Orange Button',
    content: `
      <a href="#" class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">Orange Button</a>
    `,
  });

  // Red button
  editor.BlockManager.add('red-button', {
    label: 'Red Button',
    content: `
      <a href="#" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Red Button</a>
    `,
  });

  // White button
  editor.BlockManager.add('white-button', {
    label: 'White Button',
    content: `
      <a href="#" class="bg-white text-gray-800 py-2 px-4 rounded border border-gray-300 hover:bg-gray-200">White Button</a>
    `,
  });

  // Yellow button
  editor.BlockManager.add('yellow-button', {
    label: 'Yellow Button',
    content: `
      <a href="#" class="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Yellow Button</a>
    `,
  });

  // Green button
  editor.BlockManager.add('green-button', {
    label: 'Green Button',
    content: `
      <a href="#" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Green Button</a>
    `,
  });

  // Purple button
  editor.BlockManager.add('purple-button', {
    label: 'Purple Button',
    content: `
      <a href="#" class="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">Purple Button</a>
    `,
  });

  // Gray button
  editor.BlockManager.add('gray-button', {
    label: 'Gray Button',
    content: `
      <a href="#" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Gray Button</a>
    `,
  });


    // Base CSS class for buttons to maintain consistency
    const baseButtonClass = 'flex items-center justify-center py-2 px-4 rounded transition duration-200';

    // Blue button with icon
    editor.BlockManager.add('blue-button', {
      label: 'Blue Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-blue-500 text-white hover:bg-blue-600">
          <i class="pi pi-check mr-2"></i> Blue Button
        </a>
      `,
    category: 'Buttions with icons',

    });
  
    // Indigo button with icon
    editor.BlockManager.add('indigo-button', {
      label: 'Indigo Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-indigo-500 text-white hover:bg-indigo-600">
          <i class="pi pi-info-circle mr-2"></i> Indigo Button
        </a>
      `,
    category: 'Buttions with icons',

    });
  
    // Orange button with icon
    editor.BlockManager.add('orange-button', {
      label: 'Orange Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-orange-500 text-white hover:bg-orange-600">
          <i class="pi pi-bell mr-2"></i> Orange Button
        </a>
      `,
    category: 'Buttions with icons',

    });
  
    // Red button with icon
    editor.BlockManager.add('red-button', {
      label: 'Red Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-red-500 text-white hover:bg-red-600">
          <i class="pi pi-times mr-2"></i> Red Button
        </a>
      `,
    category: 'Buttions with icons',

    });
  
    // Yellow button with icon
    editor.BlockManager.add('yellow-button', {
      label: 'Yellow Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-yellow-500 text-white hover:bg-yellow-600">
          <i class="pi pi-exclamation-triangle mr-2"></i> Yellow Button
        </a>
      `,
    category: 'Buttions with icons',

    });
  
    // Success button (green) with icon
    editor.BlockManager.add('success-button', {
      label: 'Success Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-green-500 text-white hover:bg-green-600">
          <i class="pi pi-check-circle mr-2"></i> Success
        </a>
      `,
    category: 'Buttions with icons',
    });
  
    // Outlined button with icon
    editor.BlockManager.add('outlined-button', {
      label: 'Outlined Button',
      content: `
        <a href="#" class="${baseButtonClass} border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
          <i class="pi pi-pencil mr-2"></i> Outlined Button
        </a>
      `,
    category: 'Buttions with icons',
    });
  
    // Full-width button with icon
    editor.BlockManager.add('full-width-button', {
      label: 'Full-Width Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-indigo-500 text-white w-full block hover:bg-indigo-600">
          <i class="pi pi-external-link mr-2"></i> Full-Width Button
        </a>
      `,
    category: 'Buttions with icons',

    });
  
    // Gradient button with icon
    editor.BlockManager.add('gradient-button', {
      label: 'Gradient Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
          <i class="pi pi-star mr-2"></i> Gradient Button
        </a>
      `,
    category: 'Buttions with icons',
    });
  
    // Disabled button (example without link functionality)
    editor.BlockManager.add('disabled-button', {
      label: 'Disabled Button',
      content: `
        <a class="${baseButtonClass} bg-gray-400 text-white opacity-50 cursor-not-allowed">
          <i class="pi pi-ban mr-2"></i> Disabled Button
        </a>
      `,
    category: 'Buttions with icons',

    });
  
    // Social Media Button: Facebook
    editor.BlockManager.add('facebook-button', {
      label: 'Facebook Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-blue-700 text-white hover:bg-blue-800">
          <i class="pi pi-facebook mr-2"></i> Facebook
        </a>
      `,
    category: 'Buttions with Social icons',

    });
  
    // Social Media Button: Twitter
    editor.BlockManager.add('twitter-button', {
      label: 'Twitter Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-blue-400 text-white hover:bg-blue-500">
          <i class="pi pi-twitter mr-2"></i> Twitter
        </a>
      `,
    category: 'Buttions with Social icons',

    });
  
    // Loading button (example with spinner)
    editor.BlockManager.add('loading-button', {
      label: 'Loading Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-green-500 text-white flex items-center justify-center hover:bg-green-600">
          <i class="pi pi-spin pi-spinner mr-2"></i> Loading...
        </a>
      `,
    category: 'Buttions with icons',
    });
  
    // Small Button
    editor.BlockManager.add('small-button', {
      label: 'Small Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-blue-500 text-white text-sm hover:bg-blue-600">
          <i class="pi pi-plus mr-2"></i> Small Button
        </a>
      `,
    category: 'Buttions with icons',
    });
  
    // Large Button
    editor.BlockManager.add('large-button', {
      label: 'Large Button',
      content: `
        <a href="#" class="${baseButtonClass} bg-blue-500 text-white text-lg py-3 px-6 hover:bg-blue-600">
          <i class="pi pi-arrow-right mr-2"></i> Large Button
        </a>
      `,
    category: 'Buttions with icons',
  
    });
}
