// src/pages/AddJobPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

// ⚠️ URL directa, sin importaciones problemáticas
const API_BASE = 'http://localhost:3000/jobs';

const AddJobPage = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('full-time');
  const [salary, setSalary] = useState('under-50k');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const navigate = useNavigate();

  // ⚠️ ESTA FUNCIÓN SE EJECUTA AL HACER CLIC EN EL BOTÓN
  const handleAddJob = async () => {
    console.log("✅ Botón presionado. Enviando datos a:", API_BASE);

    const newJob = {
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
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      console.log("Status de la respuesta:", response.status);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      toast.success('Empleo añadido correctamente');
      navigate('/jobs'); // Redirige al listado

    } catch (error) {
      console.error("❌ Error al conectar con la API:", error);
      toast.error('No se pudo añadir el empleo: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Añadir Nuevo Empleo</h1>
        <button 
          onClick={() => navigate('/jobs')}
          className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
        >
          <FiArrowLeft size={18} /> Volver
        </button>
      </div>

      <div className="space-y-6">
        {/* CAMPO: Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título del empleo
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Ej: Desarrollador Senior"
          />
        </div>

        {/* CAMPO: Tipo */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Empleo
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="remote">Remoto</option>
          </select>
        </div>

        {/* CAMPO: Salario */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Rango Salarial
          </label>
          <select
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="under-50k">Menos de 50k</option>
            <option value="50k-100k">50k - 100k</option>
            <option value="100k-150k">100k - 150k</option>
            <option value="over-150k">Más de 150k</option>
          </select>
        </div>

        {/* CAMPO: Ubicación */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Ej: Madrid, España"
          />
        </div>

        {/* CAMPO: Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Describe las responsabilidades..."
          />
        </div>

        {/* SECCIÓN: Empresa */}
        <fieldset className="border-t pt-6 space-y-4">
          <legend className="text-lg font-semibold text-gray-700">
            Información de la Empresa
          </legend>
          
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la empresa
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción de la empresa
            </label>
            <textarea
              id="companyDescription"
              rows={3}
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email de contacto
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>
        </fieldset>

        {/* ⚠️ BOTÓN: type="button" evita que el formulario se envíe de forma nativa */}
        <button
          type="button"
          onClick={handleAddJob}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Añadir Empleo
        </button>
      </div>
    </div>
  );
};

export default AddJobPage;