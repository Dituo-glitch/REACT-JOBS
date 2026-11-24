import { useLoaderData } from 'react-router-dom';
import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import JobListings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';

const HomePage = () => {
  const jobs = useLoaderData();

  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings jobs={jobs} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
