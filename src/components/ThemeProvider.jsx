'use client';

import { useState, useEffect } from 'react';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={theme}>
      {children}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full dark:bg-white dark:text-gray-800"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}