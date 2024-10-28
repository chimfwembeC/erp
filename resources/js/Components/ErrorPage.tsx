import React from 'react';
// import Error404 from 'assets/svgs/undraw_page_not_found_re_e9o6.svg';
export default function ErrorPage({ error }) {
  return (
    <div className="h-screen flex justify-center items-center bg-primary">
      <div className="text-center">
        <div className="">
          <img src={'assets/svgs/undraw_page_not_found_re_e9o6.svg'} className='w-96 h-96' />
        </div>
        <div className="text-4xl">Page Not Found 404</div>
        <div className="text-lg">{error}</div>
        <button className="bg-accent text-white hover:bg-primary-dark mt-4 p-2 rounded-lg">
    Accent Button
  </button>
      </div>
    </div>
  );
}
