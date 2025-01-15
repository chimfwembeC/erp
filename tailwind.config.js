import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#1cbc9c',
                'primary-dark': '#169e83',
                accent: '#f39c12',
                warning: '#e74c3c',
                header: '#2c3e50',
                background: '#ecf0f1',
                'text-dark': '#34495e',
                'sky-blue': '#3498db',
                violet: '#9b59b6',
            },
            // This generates the opacity variations for all custom colors.
            opacity: {
                100: '1',
                200: '0.9',
                300: '0.8',
                400: '0.7',
                500: '0.6',
                600: '0.5',
                700: '0.4',
                800: '0.3',
                900: '0.2',
            },
            height: {
                'screen-70': '70vh',
            },
        },
    },
    plugins: [forms, typography],
};
