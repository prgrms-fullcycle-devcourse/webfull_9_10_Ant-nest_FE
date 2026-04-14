import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen max-w-200 mx-auto flex flex-col">
      <main className="flex-1 flex flex-col pb-16">
        <Outlet />
      </main>

      <Navbar />
    </div>
  );
}
