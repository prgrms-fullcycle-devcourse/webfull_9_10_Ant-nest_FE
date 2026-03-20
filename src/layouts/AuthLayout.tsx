import {Outlet} from "react-router-dom";

export default function AuthLayout() {
  return (
      <div className="min-h-screen max-w-200 mx-auto">
          <main style={{ flex: 1, padding: '24px' }}>
              <Outlet />
          </main>
      </div>
  );
}