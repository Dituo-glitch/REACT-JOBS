import JobListing from './JobListing';

const JobListings = ({ jobs }) => {
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
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
