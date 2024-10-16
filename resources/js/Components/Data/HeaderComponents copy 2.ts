import React from 'react'
import grapesjs from 'grapesjs';


export default function HeaderComponents(editor: grapesjs.Editor) {
  // Hero Section
  editor.BlockManager.add('header-section', {
    label: 'Header Section',
    content: `
      
    `,
    category: 'Header',
  });
  

}
