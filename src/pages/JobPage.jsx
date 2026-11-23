// src/pages/JobPage.jsx
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiBuilding2, 
  FiTrash2, 
  FiEdit, 
  FiAtSign, 
  FiPhone 
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { API_BASE } from '../api/jobs';

export async function jobLoader({ params }) {
  const response = await fetch(`${API_BASE}/${params.id}`);
  if (!response.ok) throw new Error('No se pudo cargar el empleo');
  return response.json();
}

const JobPage = () => {
  const job = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro que deseas borrar este empleo?');
    if (!confirmDelete) return;

    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      toast.success('Empleo eliminado correctamente');
      navigate('/jobs');
    } catch (error) {
      toast.error('Error al eliminar');
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b pb-4">
        <Link to="/jobs" className="flex items-center text-blue-600 hover:underline text-sm">
          <FiArrowLeft className="mr-2" size={18} /> Volver a empleos
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          <FiClock size={14} /> {job.type.replace('-', ' ')}
        </span>
        <span className="flex items-center gap-1">
          <FiDollarSign size={14} /> {job.salary.replace('-', ' ').toUpperCase()}
        </span>
        <span className="flex items-center gap-1">
          <FiMapPin size={14} className="text-orange-600" /> {job.location}
        </span>
      </div>

      <section className="space-y-2 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-700">Descripción del empleo</h2>
        <p className="whitespace-pre-wrap text-gray-600">{job.description}</p>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <FiBuilding2 className="text-blue-600" /> {job.company.name}
        </h2>
        <p className="text-gray-600">{job.company.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded">
          <div className="flex items-center gap-2">
            <FiAtSign className="text-orange-500" size={16} /> <span>{job.company.contactEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone className="text-orange-500" size={16} /> <span>{job.company.contactPhone}</span>
          </div>
        </div>
      </section>

      <div className="flex gap-4 border-t pt-6 justify-end">
        <Link 
          to={`/jobs/edit/${job.id}`} 
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition flex items-center gap-2"
        >
          <FiEdit className="text-sm" /> Editar
        </Link>
        <button
          onClick={() => handleDelete(job.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-2"
        >
          <FiTrash2 className="text-sm" /> Borrar
        </button>
      </div>
    </div>
  );
};

export default JobPage;