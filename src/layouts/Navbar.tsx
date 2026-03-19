import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '홈', end: true },
  { to: '/diary/calendar', label: '일기' },
  { to: '/community', label: '달래광장' },
  { to: '/profile', label: '프로필' },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-2 h-16 w-full max-w-7xl -translate-x-1/2 shadow-[0_-4px_6px_rgba(0,0,0,0.2)] bg-white">
      <ul className="grid h-full grid-cols-4">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex h-full items-center justify-center text-sm font-medium ${
                  isActive ? 'text-black' : 'text-gray-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}