// src/components/MainLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // IMPORTANTE: Importar CSS

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar simple */}
      <nav className="bg-gray-800 text-white p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/jobs" className="text-xl font-bold hover:text-blue-300">JobBoard</Link>
          <div className="flex gap-4">
            <Link to="/jobs" className="hover:underline">Listado</Link>
            <Link to="/jobs/add" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500">Añadir</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet /> {/* Aquí se renderizan JobsPage, JobPage, Add, Edit */}
      </main>

      {/* TOAST CONTAINER (Video: position top-right) */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />
    </div>
  );
};

export default MainLayout;