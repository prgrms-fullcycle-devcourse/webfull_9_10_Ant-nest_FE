import {Outlet} from "react-router-dom";

export default function AuthLayout() {
  return (
      <div className="min-h-screen max-w-200 mx-auto">
          <main className="bg-[var(--color-bg)]">
              <Outlet />
          </main>
      </div>
  );
}