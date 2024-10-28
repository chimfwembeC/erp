import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
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
                primary: '#1cbc9c',          // Light Sea Green
                'primary-dark': '#169e83',   // Dark Sea Green
                accent: '#f39c12',           // Golden Yellow
                warning: '#e74c3c',          // Soft Coral
                header: '#2c3e50',           // Deep Slate Blue
                background: '#ecf0f1',       // Soft Gray
                'text-dark': '#34495e',      // Dark Gray
                'sky-blue': '#3498db',       // Cool Sky Blue
                violet: '#9b59b6',           // Muted Violet
              },
              height: {
                'screen-70': '70vh',
              },
        },
    },

    plugins: [forms, typography],
};
