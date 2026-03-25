import {Outlet} from "react-router-dom";

export default function AuthLayout() {
  return (
      <div className="min-h-screen max-w-200 mx-auto">
<<<<<<< Updated upstream
          <main className="h-auto bg-[var(--color-bg)]">
=======
          <main className='flex-1'>
>>>>>>> Stashed changes
              <Outlet />
          </main>
      </div>
  );
}