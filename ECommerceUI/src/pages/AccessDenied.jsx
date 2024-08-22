import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-13rem)] text-center p-4">
      <h1 className="text-5xl font-extrabold text-red-600">403</h1>
      <p className="text-2xl font-semibold text-gray-800 mt-4">Erişim Yetkiniz Yok</p>
      <p className="text-gray-600 mt-2">Bu sayfayı görüntülemek için yeterli yetkiniz yok.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Anasayfaya Dön
      </Link>
    </div>
  );
};

export default AccessDenied;
