// src/pages/JobsPage.jsx
import { useLoaderData, Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { API_BASE } from '../api/jobs';

// Loader para el listado
export async function jobsLoader() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Error cargando lista');
  return response.json();
}

const JobsPage = () => {
  const jobs = useLoaderData(); // Array de jobs

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Empleos Disponibles</h1>
        <Link to="/jobs/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2">
          <FiPlus size={18} /> Añadir Empleo
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No hay empleos publicados.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link 
              key={job.id} 
              to={`/jobs/${job.id}`} 
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-3">{job.company.name}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.type}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{job.salary}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{job.location}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;