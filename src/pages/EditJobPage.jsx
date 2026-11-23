// src/pages/EditJobPage.jsx
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { updateJob } from '../api/jobs';
import JobForm from '../components/JobForm';

const EditJobPage = () => {
  const job = useLoaderData();
  const navigate = useNavigate();

  const handleUpdate = async (data) => {
    try {
      await updateJob(job.id, { ...data, id: job.id });
      toast.success('Empleo actualizado correctamente');
      navigate(`/jobs/${job.id}`);
    } catch (error) {
      toast.error('No se pudo actualizar: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editar empleo</h1>
        <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
          <FiArrowLeft size={18} /> Volver al detalle
        </Link>
      </div>

      <JobForm
        initialJob={job}
        onSubmit={handleUpdate}
        submitLabel="Actualizar empleo"
        submitClass="bg-yellow-500 hover:bg-yellow-600"
      />
    </div>
  );
};

export default EditJobPage;
