// src/components/MainLayout.jsx
import { Outlet, useNavigation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Spinner from './Spinner';

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      {navigation.state === 'loading' ? <Spinner loading /> : <Outlet />}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
