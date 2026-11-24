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
import { homeLoader, jobsLoader, jobLoader } from './api/jobs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage />, loader: homeLoader },
          { path: 'jobs', element: <JobsPage />, loader: jobsLoader },
          { path: 'jobs/:id', element: <JobPage />, loader: jobLoader },
          { path: 'add-job', element: <AddJobPage /> },
          { path: 'edit-job/:id', element: <EditJobPage />, loader: jobLoader },
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
