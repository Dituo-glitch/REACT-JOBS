// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ErrorPage from './components/ErrorPage';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import NotFoundPage from './pages/NotFoundPage';
import { jobsLoader, jobLoader } from './api/jobs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // Ruta sin path: los errores se muestran dentro del layout (con el menú)
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'jobs', element: <JobsPage />, loader: jobsLoader },
          // Las rutas estáticas van ANTES que las dinámicas (:id)
          { path: 'jobs/add', element: <AddJobPage /> },
          { path: 'jobs/edit/:id', element: <EditJobPage />, loader: jobLoader },
          { path: 'jobs/:id', element: <JobPage />, loader: jobLoader },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
