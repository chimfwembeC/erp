import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
export default function LoadingPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
        <ProgressSpinner />
    </div>
  )
}
