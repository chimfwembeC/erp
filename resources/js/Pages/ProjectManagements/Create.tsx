import React from 'react'
import ProjectForm from './Components/ProjectForm'
import AppLayout from '@/Layouts/AppLayout'

export default function Create() {
    return (
        <AppLayout title='Add Project'>
            <div className='flex justify-end px-4'>
                <ProjectForm />
            </div>
        </AppLayout>
    )
}
