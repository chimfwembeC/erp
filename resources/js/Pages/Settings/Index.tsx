import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SettingsPanel from '@/Components/SettingsPanel';
import useRoute from '@/Hooks/useRoute';
import { router, usePage } from '@inertiajs/react';
import { Activity, Bell, Brush, CreditCard, Database, Globe, Link, Lock, Settings, Shield, Users } from 'lucide-react';
import GeneralSettings from '@/Components/GeneralSettings';
import { SettingsLayout } from '@/Components/SettingsLayout';
import NotificationSettings from '@/Components/NotificationSettings';
import UserSettings from '@/Components/UserSettings';
import StorageSettings from '@/Components/StorageSettings';
import CustomizationSettings from '@/Components/CustomizationSettings';
import LogSettings from '@/Components/LogSettings';

const Index = ({ settings }) => {
    const route = useRoute();
    const { url } = usePage();  // Get the current URL from the page

    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'HRM', href: '/hrm' },
        { label: 'Settings' },
    ];
    const [currentSection, setCurrentSection] = useState(url);

    const handleSectionChange = (href: string) => {
        setCurrentSection(href);
    };

    return (
        <AppLayout title="Settings Management">
            <Breadcrumb items={items} />
            <SettingsLayout currentSection={currentSection} onSectionChange={handleSectionChange}>
                {/* Render content based on the current section */}
                {currentSection === '/settings/general' && <GeneralSettings />}

                {currentSection === '/settings/notifications' && <NotificationSettings />}

                {currentSection === '/settings/users' && <UserSettings />}

                {currentSection === '/settings/storage' && <StorageSettings />}

                {currentSection === '/settings/customization' && <CustomizationSettings />}

                {currentSection === '/settings/logs' && <LogSettings />}

            </SettingsLayout>
        </AppLayout>
    );
};

export default Index;
