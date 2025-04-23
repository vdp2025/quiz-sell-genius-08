
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
      <div className="text-center">
        <h1 className="text-4xl font-playfair font-bold mb-4 text-[#432818]">404</h1>
        <p className="text-xl text-[#8F7A6A] mb-4">Oops! Página não encontrada</p>
        <a href="/" className="text-[#B89B7A] hover:text-[#A38A69] underline">
          Voltar para a Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
