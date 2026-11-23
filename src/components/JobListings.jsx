import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import { getJobs } from '../api/jobs';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getJobs(isHome ? 3 : undefined)
      .then((data) => {
        if (!cancelled) setJobs(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10 rounded-lg">
      <div className="container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Empleos recientes' : 'Todos los empleos'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No hay empleos publicados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
