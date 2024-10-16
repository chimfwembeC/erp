import React from 'react'
import grapesjs from 'grapesjs';


export default function HeroComponents(editor: grapesjs.Editor) {
  // Hero Section
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
    category: 'Hero Sections',
  });

  // hero section 1
    editor.BlockManager.add('hero-section-1', {
        label: 'Hero Section-1',
        content: `
     <section class="w-full px-8 text-gray-700 bg-white">
    <div class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div class="relative flex flex-col md:flex-row">
            <a href="#_" class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                <span class="mx-auto text-xl font-black leading-none text-gray-900 select-none">AI<span class="text-indigo-600">.</span></span>
            </a>
            <nav class="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                <a href="#_" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</a>
                <a href="#_" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Features</a>
                <a href="#_" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#_" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Blog</a>
            </nav>
        </div>

        <div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <a href="#" class="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </a>
            <a href="#" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Sign up
            </a>
        </div>
    </div>
</section>


<section class="px-2 py-32 bg-white md:px-0">
  <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
    <div class="flex flex-wrap items-center sm:-mx-3">
      <div class="w-full md:w-1/2 md:px-3">
        <div class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span class="block xl:inline">Useful Tools to</span>
            <span class="block text-indigo-600 xl:inline">Help You Build Faster.</span>
          </h1>
          <p class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">It's never been easier to build beautiful websites that convey your message and tell your story.</p>
          <div class="relative flex flex-col sm:flex-row sm:space-x-4">
            <a href="#_" class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
              Try It Free
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#_" class="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
            <img src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80">
          </div>
      </div>
    </div>
  </div>
</section>
    `,
    category: 'Hero Sections',
    });

      // hero section 3
  editor.BlockManager.add('hero-section-3', {
    label: 'hero-section-3',
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
    `,category: 'Hero Sections',
  }
);

}
