import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  let title = 'Algo salió mal';
  let message = 'Ocurrió un error inesperado.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'No encontrado';
      message = 'El empleo que buscas no existe o fue eliminado.';
    } else {
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">{title}</h1>
      <p className="text-gray-600 mb-6">{message}</p>
      <Link
        to="/jobs"
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Volver a los empleos
      </Link>
    </div>
  );
};

export default ErrorPage;
