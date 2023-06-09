/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-navbar ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to='/'><img src="/src/assets/LOGO-UNIR.png" width={200} height={200} alt="Image" /></Link>
            </div>
            <div className="hidden md:flex md:space-x-4">
              <Link to='colores' className="text-gray-700 text-xl">Juego Colores</Link>
            </div>
            <div className="hidden md:flex md:space-x-4">
              <Link to='preguntas' className="text-gray-700 text-xl">Juego Preguntas</Link>
            </div>
            <div className="hidden md:flex md:space-x-4">
              <Link to='memoria' className="text-gray-700 text-xl">Juego Memoria</Link>
            </div>
            <div className="hidden md:flex md:space-x-4">
              <Link to='' className="text-gray-700 text-xl">Nosotros</Link>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                onClick={toggleMenu}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="mt-2">
              <Link to='colores' className="text-gray-700 text-xl">Juego Colores</Link>
              <Link to='preguntas' className="text-gray-700 text-xl">Juego Preguntas</Link>
              <Link to='memoria' className="text-gray-700 text-xl">Juego Memoria</Link>
              <Link to='' className="text-gray-700 text-xl">Nosotros</Link>
            </div>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
