import React, { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import useTypedPage from '@/Hooks/useTypedPage';
import { useTranslation } from 'react-i18next';

export default function Welcome() {
    const page = useTypedPage();
    const [quote, setQuote] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        // Fetch the quote from the Laravel API
        fetch('/api/quote')
            .then((response) => response.json())
            .then((data) => setQuote(data.quote))
            .catch((error) => console.error('Error fetching quote:', error));
    }, []);

    return (
        <div className="p-2 lg:p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
            {/* Welcome Message */}
            <h1 className="mt-2 text-2xl font-medium text-gray-900 dark:text-white">
                {t('welcome')} {page.props.auth.user?.name}!
                {/* Welcome {page.props.auth.user?.name}! */}
            </h1>

            {/* Inspiring Quote */}
            {quote && (
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {t('inspirationOfTheDay')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 italic">“{quote}”</p>
                </div>
            )}
        </div>
    );
}
