// src/pages/AddJobPage.jsx
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createJob } from '../api/jobs';
import JobForm from '../components/JobForm';

const AddJobPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (job) => {
    try {
      const created = await createJob(job);
      toast.success('Job Added Successfully');
      navigate(`/jobs/${created.id}`);
    } catch (error) {
      toast.error('Could not add the job: ' + error.message);
    }
  };

  return (
    <JobForm heading="Add Job" onSubmit={handleCreate} submitLabel="Add Job" />
  );
};

export default AddJobPage;
