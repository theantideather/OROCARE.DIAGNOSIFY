import React, { useEffect, useState } from 'react';

export const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved preference or use system preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true' || 
        (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    // Add or remove the dark class from the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 z-50 glassmorphism p-2 rounded-full shadow-lg transition-all duration-300 w-10 h-10 flex items-center justify-center"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-300" stroke="currentColor">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-700" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle; 