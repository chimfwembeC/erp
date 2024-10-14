import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import LandingPage from '@/Components/LandingPage';
import MyPage from '@/Components/MyPage';
import LandingPageCreator from '@/Components/LandingPageCreator';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({
  canLogin,
  canRegister,
  laravelVersion,
  phpVersion,
}: Props) {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <>
      <Head title="Welcome" />  
      <div className="">        
          {/* <LandingPage slug='erp-landing' />           */}
          <LandingPageCreator />
        </div>
    </>
  );
}
