// src/components/MainLayout.jsx
import { Outlet, useNavigation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Spinner from './Spinner';

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 px-4">
        {navigation.state === 'loading' ? <Spinner loading /> : <Outlet />}
      </main>

      <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default MainLayout;
