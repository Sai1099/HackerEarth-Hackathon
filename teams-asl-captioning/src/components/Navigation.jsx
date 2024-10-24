import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Teams ASL & Captioning
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/settings"
              className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};