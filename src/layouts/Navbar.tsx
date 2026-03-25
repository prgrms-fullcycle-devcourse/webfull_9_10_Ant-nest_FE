import { CalendarIcon, HeartIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '홈', end: true, icon: <HomeIcon/> },
  { to: '/diary/calendar', label: '일기', icon: <CalendarIcon /> },
  { to: '/community', label: '달래광장', icon: <HeartIcon /> },
  { to: '/profile', label: '프로필', icon: <PersonIcon /> },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 h-16 w-full max-w-200 -translate-x-1/2 shadow-[var(--shadow-top)] bg-white rounded-t-2xl">
      <ul className="grid h-full grid-cols-4">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className='flex flex-col h-full items-center justify-center text-sm font-medium gap-1 text-[var(--color-gray)]'
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center justify-center rounded-full transition-all ${
                      isActive
                        ? 'h-10 w-10 bg-[var(--color-primary)] text-[var(--color-white)]'
                        : 'h-8 w-8'
                    }`}
                  >
                    {item.icon}
                  </div>

                  {!isActive && (
                    <span className="text-xs font-medium">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}