import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobPage = ({ updateJobSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('Under $50K');
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar los datos actuales del empleo al montar el componente
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();

        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setSalary(data.salary);
        setLocation(data.location);
        setCompanyName(data.company.name);
        setCompanyDescription(data.company.description);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (error) {
        console.error('Error fetching job for edit', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      id,
      title,
      type,
      description,
      salary,
      location,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    try {
      await updateJobSubmit(updatedJob);
      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error('Error al actualizar el empleo:', error);
      alert('Hubo un error al actualizar el empleo.');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-20">Cargando datos del empleo...</div>;
  }

  return (
    <section className="bg-indigo-50 py-20">
      <div className="container m-auto max-w-2xl py-2">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Update Job</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Job Type</label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Job Listing Name</label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Salary</label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - $60K">$50K - $60K</option>
                <option value="$60K - $70K">$60K - $70K</option>
                <option value="$70K - $80K">$70K - $80K</option>
                <option value="$80K - $90K">$80K - $90K</option>
                <option value="$90K - $100K">$90K - $100K</option>
                <option value="$100K - $125K">$100K - $125K</option>
                <option value="$125K - $150K">$125K - $150K</option>
                <option value="$150K - $175K">$150K - $175K</option>
                <option value="$175K - $200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <h3 className="text-2xl font-semibold mb-5">Company Info</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                className="border rounded w-full py-2 px-3"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Company Description</label>
              <textarea
                id="company_description"
                name="company_description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Contact Email</label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                className="border rounded w-full py-2 px-3"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Contact Phone</label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                className="border rounded w-full py-2 px-3"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;