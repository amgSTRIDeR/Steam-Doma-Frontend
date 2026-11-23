import { Outlet } from 'react-router-dom';
import Header from '../../layout/Header/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
