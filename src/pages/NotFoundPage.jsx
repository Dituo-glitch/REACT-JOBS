import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <h1 className="text-5xl font-bold text-gray-800 mb-3">404</h1>
      <p className="text-gray-600 mb-6">Esta página no existe.</p>
      <Link
        to="/"
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Ir al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
