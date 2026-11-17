import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Obtener los empleos al cargar el componente (GET)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 2. Función para agregar un nuevo empleo (POST)
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    const data = await res.json();
    setJobs([...jobs, data]);
    return; // <-- Importante para que la promesa se resuelva
  };

  // 3. Función para eliminar un empleo (DELETE)
  const deleteJob = async (id) => {
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // 4. Función para actualizar un empleo (PUT)
  const updateJob = async (updatedJob) => {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    });
    const data = await res.json();
    
    // Actualizamos el estado local mapeando el empleo modificado
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? data : job)));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;