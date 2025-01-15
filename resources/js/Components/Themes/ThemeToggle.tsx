import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from './ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="flex items-center space-x-4">
            <div
                className={`relative w-12 h-6 rounded-full cursor-pointer transition-all ${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                onClick={toggleTheme}
            >
                <div
                    className={`absolute w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform ${theme === 'dark' ? 'transform translate-x-6' : 'transform translate-x-0'
                        }`}
                >
                    {theme === 'dark' ? (
                        <Moon className="w-4 h-4 text-blue-500" />
                    ) : (
                        <Sun className="w-4 h-4 text-yellow-500" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThemeToggle;
