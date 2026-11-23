import { useState } from 'react';

const inputClass =
  'w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const toFormState = (job) => ({
  title: job?.title ?? '',
  type: job?.type ?? 'full-time',
  salary: job?.salary ?? 'under-50k',
  location: job?.location ?? '',
  description: job?.description ?? '',
  companyName: job?.company?.name ?? '',
  companyDescription: job?.company?.description ?? '',
  contactEmail: job?.company?.contactEmail ?? '',
  contactPhone: job?.company?.contactPhone ?? '',
});

const toJob = (f) => ({
  title: f.title.trim(),
  type: f.type,
  salary: f.salary,
  location: f.location.trim(),
  description: f.description.trim(),
  company: {
    name: f.companyName.trim(),
    description: f.companyDescription.trim(),
    contactEmail: f.contactEmail.trim(),
    contactPhone: f.contactPhone.trim(),
  },
});

// Formulario compartido por "Añadir" y "Editar"
const JobForm = ({ initialJob, onSubmit, submitLabel, submitClass }) => {
  const [form, setForm] = useState(() => toFormState(initialJob));
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(toJob(form));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className={labelClass}>Título del empleo</label>
        <input type="text" id="title" name="title" value={form.title} onChange={handleChange}
          className={inputClass} placeholder="Ej: Desarrollador React Senior" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className={labelClass}>Tipo de empleo</label>
          <select id="type" name="type" value={form.type} onChange={handleChange} className={inputClass}>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="remote">Remoto</option>
          </select>
        </div>
        <div>
          <label htmlFor="salary" className={labelClass}>Rango salarial</label>
          <select id="salary" name="salary" value={form.salary} onChange={handleChange} className={inputClass}>
            <option value="under-50k">Menos de 50k</option>
            <option value="50k-100k">50k - 100k</option>
            <option value="100k-150k">100k - 150k</option>
            <option value="over-150k">Más de 150k</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>Ubicación</label>
        <input type="text" id="location" name="location" value={form.location} onChange={handleChange}
          className={inputClass} placeholder="Ej: Bogotá, Colombia" required />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Descripción</label>
        <textarea id="description" name="description" rows={4} value={form.description} onChange={handleChange}
          className={inputClass} placeholder="Describe las responsabilidades..." required />
      </div>

      <fieldset className="border-t pt-6 space-y-4">
        <legend className="text-lg font-semibold text-gray-700">Información de la empresa</legend>

        <div>
          <label htmlFor="companyName" className={labelClass}>Nombre de la empresa</label>
          <input type="text" id="companyName" name="companyName" value={form.companyName} onChange={handleChange}
            className={inputClass} required />
        </div>

        <div>
          <label htmlFor="companyDescription" className={labelClass}>Descripción de la empresa</label>
          <textarea id="companyDescription" name="companyDescription" rows={3} value={form.companyDescription}
            onChange={handleChange} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactEmail" className={labelClass}>Email de contacto</label>
            <input type="email" id="contactEmail" name="contactEmail" value={form.contactEmail}
              onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="contactPhone" className={labelClass}>Teléfono de contacto</label>
            <input type="tel" id="contactPhone" name="contactPhone" value={form.contactPhone}
              onChange={handleChange} className={inputClass} />
          </div>
        </div>
      </fieldset>

      <button type="submit" disabled={saving}
        className={`w-full text-white py-3 rounded-md transition font-medium disabled:opacity-60 ${submitClass}`}>
        {saving ? 'Guardando...' : submitLabel}
      </button>
    </form>
  );
};

export default JobForm;
