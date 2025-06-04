import React from 'react';
import { Moon, Sun, CheckSquare } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="mb-8 flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        <CheckSquare size={28} className="mr-2 text-primary-600 dark:text-primary-500" />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Leo's To-do</h1>
      </div>
      
      <button
        onClick={toggleDarkMode}
        className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>
    </header>
  );
};

export default Header;