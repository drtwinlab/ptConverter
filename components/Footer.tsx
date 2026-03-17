
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-slate-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} WorkDay Converter Tool. Designed for Efficiency.
        </p>
        <p className="text-slate-300 text-xs mt-1 italic">
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
