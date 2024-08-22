import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-13rem)] text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">Sayfa bulunamadı</p>
      <p className="text-gray-500 mt-2">Üzgünüz, aradığınız sayfa mevcut değil.</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Anasayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
