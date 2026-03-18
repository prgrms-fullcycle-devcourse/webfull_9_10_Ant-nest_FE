import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import DiaryPage from '../pages/diary/DiaryPage';
import CalendarPage from '../pages/calendar/CalendarPage';
import CommunityPage from '../pages/community/CommunityPage';
import ProfilePage from '../pages/profile/ProfilePage';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/diary', element: <DiaryPage /> },
      { path: '/calendar', element: <CalendarPage /> },
      { path: '/community', element: <CommunityPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
  // 잘못된 경로 처리
  { path: '*', element: <Navigate to="/" replace /> },
]);