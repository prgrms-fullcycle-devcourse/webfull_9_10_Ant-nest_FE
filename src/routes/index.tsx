import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import DiaryCreatePage from '../pages/diary/DiaryCreatePage';
import CalendarPage from '../pages/calendar/CalendarPage';
import CommunityPage from '../pages/community/CommunityPage';
import ProfilePage from '../pages/profile/ProfilePage';
import DiaryListPage from '../pages/diary/DiaryListPage';
import DiaryDetailPage from '../pages/diary/DiaryDetailPage';
import CommunityDetailPage from '../pages/community/CommunityDetailPage';
import PlainLayout from '../layouts/PlainLayout';
import { useAuthStore } from '@/store/authStore.ts';
import NotFoundPage from '@/pages/not-found/NotFoundPage.tsx';
import SignupSuccessPage from '@/pages/auth/SignupSuccessPage.tsx';

function PrivateRoute() {
  const { isAuthenticated, isGuest } = useAuthStore();
  return isAuthenticated || isGuest ? <Outlet /> : <Navigate to="/login" replace />;
}

function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      // 로그인
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> }, // 로그인
          { path: '/signup', element: <SignupPage /> }, // 회원가입
          { path: '/signup/success', element: <SignupSuccessPage /> }, // 회원가입 완료
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      //  Navbar 있는 페이지
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <HomePage /> }, // 기본 페이지 (홈)
          { path: '/diary/calendar', element: <CalendarPage /> }, // 내 일기목록(달력)
          { path: '/diary', element: <DiaryListPage /> }, // 내 일기목록(채팅)
          { path: '/community', element: <CommunityPage /> }, // 달래광장
          { path: '/profile', element: <ProfilePage /> }, // 마이페이지
        ],
      },
      // Navbar 없는 페이지
      {
        element: <PlainLayout />,
        children: [
          { path: '/diary/new', element: <DiaryCreatePage /> }, // 일기작성
          { path: '/diary/:id', element: <DiaryDetailPage /> }, // 내 일기 상세 페이지
          { path: '/community/:id', element: <CommunityDetailPage /> }, // 달래광장 상세 페이지
        ],
      },
    ],
  },
  // 잘못된 경로 처리
  { path: '*', element: <NotFoundPage /> },
]);
