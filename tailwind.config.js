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
            height: {
                'screen-70': '70vh',
            },
            backgroundImage: {
                'parallax': 'url("/assets/imgs/Uses - La liste complète de mon setup WFH.jpeg")',
            },
        },
        animation: {
            kenburns: 'kenburns 8s infinite',
            slideUp: 'slideUp 0.8s ease-out',
        },
        keyframes: {
            kenburns: {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
            },
            slideUp: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            },
        },
    },
    plugins: [forms, typography],
};
