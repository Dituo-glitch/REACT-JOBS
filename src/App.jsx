// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'; // <-- Añadido Navigate
import MainLayout from './components/MainLayout';
import JobsPage, { jobsLoader } from './pages/JobsPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div className="p-4 text-red-500">Error cargando página</div>,
    children: [
      { index: true, element: <Navigate to="/jobs" replace /> }, 
      { 
        path: 'jobs', 
        element: <JobsPage />, 
        loader: jobsLoader 
      },
      // ⚠️ IMPORTANTE: Las rutas estáticas van ANTES que las dinámicas (:id)
      { 
        path: 'jobs/add', 
        element: <AddJobPage /> 
      },
      { 
        path: 'jobs/edit/:id', 
        element: <EditJobPage /> 
      },
      // La ruta dinámica va al final
      { 
        path: 'jobs/:id', 
        element: <JobPage />, 
        loader: jobLoader 
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;