import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Job not found';
      message = 'The job you are looking for does not exist or was removed.';
    } else {
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <h1 className="text-6xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-5">{message}</p>
      <Link
        to="/jobs"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Back to Jobs
      </Link>
    </section>
  );
};

export default ErrorPage;
