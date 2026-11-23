// src/pages/EditJobPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { API_BASE } from '../api/jobs';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('full-time');
  const [salary, setSalary] = useState('under-50k');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_BASE}/${id}`);
        if (!response.ok) throw new Error('No encontrado');
        const job = await response.json();

        setTitle(job.title);
        setType(job.type);
        setSalary(job.salary);
        setLocation(job.location);
        setDescription(job.description);
        setCompanyName(job.company.name);
        setCompanyDescription(job.company.description);
        setContactEmail(job.company.contactEmail);
        setContactPhone(job.company.contactPhone);
      } catch (error) {
        toast.error('Error al cargar empleo');
        navigate('/jobs');
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      salary,
      location,
      description,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) throw new Error('Error al actualizar');

      toast.success('Empleo actualizado correctamente');
      navigate(`/jobs/${id}`);
    } catch (error) {
      toast.error('No se pudo actualizar');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editar Empleo</h1>
        <Link to={`/jobs/${id}`} className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
          <FiArrowLeft size={18} /> Volver al detalle
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título del empleo</label>
          <input
            type="text" id="title" name="title"
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              id="type" name="type"
              value={type} onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="remote">Remoto</option>
            </select>
          </div>
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Rango Salarial</label>
            <select
              id="salary" name="salary"
              value={salary} onChange={(e) => setSalary(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="under-50k">Menos de 50k</option>
              <option value="50k-100k">50k - 100k</option>
              <option value="100k-150k">100k - 150k</option>
              <option value="over-150k">Más de 150k</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
          <input
            type="text" id="location" name="location"
            value={location} onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            id="description" name="description" rows={4}
            value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <fieldset className="border-t pt-6 space-y-4">
          <legend className="text-lg font-semibold text-gray-700">Información de la Empresa</legend>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa</label>
            <input
              type="text" id="companyName"
              value={companyName} onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">Descripción de la empresa</label>
            <textarea
              id="companyDescription" rows={3}
              value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Email de contacto</label>
              <input
                type="email" id="contactEmail"
                value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono de contacto</label>
              <input
                type="tel" id="contactPhone"
                value={contactPhone} onChange={(e) => setContactPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition font-medium"
        >
          Actualizar Empleo
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;