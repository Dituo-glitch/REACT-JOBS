// src/pages/EditJobPage.jsx
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateJob } from '../api/jobs';
import JobForm from '../components/JobForm';

const EditJobPage = () => {
  const job = useLoaderData();
  const navigate = useNavigate();

  const handleUpdate = async (data) => {
    try {
      await updateJob(job.id, { ...data, id: job.id });
      toast.success('Job Updated Successfully');
      navigate(`/jobs/${job.id}`);
    } catch (error) {
      toast.error('Could not update the job: ' + error.message);
    }
  };

  return (
    <JobForm
      heading="Update Job"
      initialJob={job}
      onSubmit={handleUpdate}
      submitLabel="Update Job"
    />
  );
};

export default EditJobPage;
