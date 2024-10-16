import React from 'react';
import grapesjs from 'grapesjs';

export default function ResponsiveLayoutComponents(editor) {
  // 1 Column Layout
  editor.BlockManager.add('1-column-layout', {
    label: '1 Column Layout',
    category: 'Layouts',
    content: `
      <section class="container mx-auto p-4">
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-gray-200 p-8">Column 1</div>
        </div>
      </section>
    `,
  });

  // 2 Columns Layout
  editor.BlockManager.add('2-column-layout', {
    label: '2 Columns Layout',
    category: 'Layouts',
    content: `
      <section class="container mx-auto p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-200 p-8">Column 1</div>
          <div class="bg-gray-300 p-8">Column 2</div>
        </div>
      </section>
    `,
  });

  // 3 Columns Layout
  editor.BlockManager.add('3-column-layout', {
    label: '3 Columns Layout',
    category: 'Layouts',
    content: `
      <section class="container mx-auto p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-200 p-8">Column 1</div>
          <div class="bg-gray-300 p-8">Column 2</div>
          <div class="bg-gray-400 p-8">Column 3</div>
        </div>
      </section>
    `,
  });

  // 4 Columns Layout
  editor.BlockManager.add('4-column-layout', {
    label: '4 Columns Layout',
    category: 'Layouts',
    content: `
      <section class="container mx-auto p-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-gray-200 p-8">Column 1</div>
          <div class="bg-gray-300 p-8">Column 2</div>
          <div class="bg-gray-400 p-8">Column 3</div>
          <div class="bg-gray-500 p-8">Column 4</div>
        </div>
      </section>
    `,
  });

  


  
}
