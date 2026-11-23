import { Link } from 'react-router-dom';
import Card from './Card';

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card bg="bg-gray-100">
            <h2 className="text-2xl font-bold">Para desarrolladores</h2>
            <p className="mt-2 mb-4">
              Explora nuestros empleos React y empieza tu carrera hoy
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Ver empleos
            </Link>
          </Card>

          <Card bg="bg-indigo-100">
            <h2 className="text-2xl font-bold">Para empresas</h2>
            <p className="mt-2 mb-4">
              Publica tu oferta y encuentra al desarrollador ideal
            </p>
            <Link
              to="/jobs/add"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Añadir empleo
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
