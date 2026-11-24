import { useState } from 'react';

const JOB_TYPES = ['Full-Time', 'Part-Time', 'Remote', 'Internship'];

const SALARIES = [
  'Under $50K',
  '$50K - $60K',
  '$60K - $70K',
  '$70K - $80K',
  '$80K - $90K',
  '$90K - $100K',
  '$100K - $125K',
  '$125K - $150K',
  '$150K - $175K',
  '$175K - $200K',
  'Over $200K',
];

const labelClass = 'block text-gray-700 font-bold mb-2';
const fieldClass = 'border border-black rounded w-full py-2 px-3';

const toFormState = (job) => ({
  type: job?.type ?? 'Full-Time',
  title: job?.title ?? '',
  description: job?.description ?? '',
  salary: job?.salary ?? 'Under $50K',
  location: job?.location ?? '',
  companyName: job?.company?.name ?? '',
  companyDescription: job?.company?.description ?? '',
  contactEmail: job?.company?.contactEmail ?? '',
  contactPhone: job?.company?.contactPhone ?? '',
});

const toJob = (f) => ({
  title: f.title.trim(),
  type: f.type,
  location: f.location.trim(),
  description: f.description.trim(),
  salary: f.salary,
  company: {
    name: f.companyName.trim(),
    description: f.companyDescription.trim(),
    contactEmail: f.contactEmail.trim(),
    contactPhone: f.contactPhone.trim(),
  },
});

// Formulario compartido por "Add Job" y "Edit Job"
const JobForm = ({ heading, initialJob, onSubmit, submitLabel }) => {
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

  const salaryOptions = SALARIES.includes(form.salary)
    ? SALARIES
    : [form.salary, ...SALARIES];
  const typeOptions = JOB_TYPES.includes(form.type)
    ? JOB_TYPES
    : [form.type, ...JOB_TYPES];

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border border-black m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">{heading}</h2>

            <div className="mb-4">
              <label htmlFor="type" className={labelClass}>Job Type</label>
              <select id="type" name="type" className={fieldClass} required
                value={form.type} onChange={handleChange}>
                {typeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="title">Job Listing Name</label>
              <input type="text" id="title" name="title" className={`${fieldClass} mb-2`}
                placeholder="eg. Beautiful Apartment In Miami" required
                value={form.title} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className={labelClass}>Description</label>
              <textarea id="description" name="description" className={fieldClass} rows="4"
                placeholder="Add any job duties, expectations, requirements, etc" required
                value={form.description} onChange={handleChange}></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="salary" className={labelClass}>Salary</label>
              <select id="salary" name="salary" className={fieldClass} required
                value={form.salary} onChange={handleChange}>
                {salaryOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className={labelClass}>Location</label>
              <input type="text" id="location" name="location" className={`${fieldClass} mb-2`}
                placeholder="Company Location" required
                value={form.location} onChange={handleChange} />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label htmlFor="companyName" className={labelClass}>Company Name</label>
              <input type="text" id="companyName" name="companyName" className={fieldClass}
                placeholder="Company Name" required
                value={form.companyName} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="companyDescription" className={labelClass}>Company Description</label>
              <textarea id="companyDescription" name="companyDescription" className={fieldClass} rows="4"
                placeholder="What does your company do?"
                value={form.companyDescription} onChange={handleChange}></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="contactEmail" className={labelClass}>Contact Email</label>
              <input type="email" id="contactEmail" name="contactEmail" className={fieldClass}
                placeholder="Email address for applicants" required
                value={form.contactEmail} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="contactPhone" className={labelClass}>Contact Phone</label>
              <input type="tel" id="contactPhone" name="contactPhone" className={fieldClass}
                placeholder="Optional phone for applicants"
                value={form.contactPhone} onChange={handleChange} />
            </div>

            <div>
              <button type="submit" disabled={saving}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-60">
                {saving ? 'Saving...' : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobForm;
