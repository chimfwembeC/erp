import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from './ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="flex items-center space-x-4">
            <div
                className={`relative w-12 h-8 rounded-full cursor-pointer transition-all ${theme === 'dark' ? 'bg-blue-500' : 'bg-indigo-500'
                    }`}
                onClick={toggleTheme}
            >
                <div
                    className={`absolute w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform ${theme === 'dark' ? 'transform translate-x-6' : 'transform translate-x-0'
                        }`}
                >
                    {theme === 'dark' ? (
                        <Moon className="w-4 h-4 text-indigo-500" />
                    ) : (
                        <Sun className="w-4 h-4 text-yellow-500" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThemeToggle;
