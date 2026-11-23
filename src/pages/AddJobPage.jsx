// src/pages/AddJobPage.jsx
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { createJob } from '../api/jobs';
import JobForm from '../components/JobForm';

const AddJobPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (job) => {
    try {
      const created = await createJob(job);
      toast.success('Empleo añadido correctamente');
      navigate(`/jobs/${created.id}`);
    } catch (error) {
      toast.error('No se pudo añadir el empleo: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Añadir nuevo empleo</h1>
        <Link to="/jobs" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
          <FiArrowLeft size={18} /> Volver
        </Link>
      </div>

      <JobForm
        onSubmit={handleCreate}
        submitLabel="Añadir empleo"
        submitClass="bg-blue-600 hover:bg-blue-700"
      />
    </div>
  );
};

export default AddJobPage;
