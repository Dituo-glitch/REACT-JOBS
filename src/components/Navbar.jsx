import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `text-white rounded-md px-3 py-2 hover:bg-gray-900 ${
    isActive ? 'bg-black' : ''
  }`;

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <NavLink to="/" className="text-white text-2xl font-bold">
            React Jobs
          </NavLink>
          <div className="flex space-x-2">
            <NavLink to="/" end className={linkClass}>
              Inicio
            </NavLink>
            <NavLink to="/jobs" end className={linkClass}>
              Empleos
            </NavLink>
            <NavLink to="/jobs/add" className={linkClass}>
              Añadir empleo
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
