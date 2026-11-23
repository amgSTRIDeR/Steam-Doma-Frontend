import { Outlet } from 'react-router-dom';
import Header from '../../layout/Header/Header';
import Sidebar from '../../layout/Sidebar/Sidebar';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
}
