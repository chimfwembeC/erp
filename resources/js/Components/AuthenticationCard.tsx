import React, { PropsWithChildren } from 'react';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="min-h-screen flex flex-col gap-4 bg-primary sm:flex-row sm:justify-center items-center pt-6 sm:pt-0 bg-background">
      {/* Image Section */}
      <div className="hidden sm:block sm:w-1/2 lg:flex justify-center">
        <img 
          src="/assets/svgs/undraw_login_re_4vu2.svg" // Replace with your desired dimensions
          alt="Placeholder Image"
          className="object-cover h-64 w-64 rounded-l-lg" // Ensures the image covers the section properly
        />
      </div>

      {/* Authentication Card Section */}
      <div className="w-full sm:max-w-md mt-6 sm:mt-0 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <div className="text-center">
          <div className="flex justify-center m-4">
          <AuthenticationCardLogo />          
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}
