import { useLoaderData } from 'react-router-dom';
import JobListings from '../components/JobListings';

const JobsPage = () => {
  const jobs = useLoaderData();

  return <JobListings jobs={jobs} />;
};

export default JobsPage;
