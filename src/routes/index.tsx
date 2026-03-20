import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import HomePage from '../pages/HomePage';
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

export const router = createBrowserRouter([
  //  Navbar 있는 페이지
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },                       // 기본 페이지 (홈)
      { path: '/diary/calendar', element: <CalendarPage /> },     // 내 일기목록(달력)
      { path: '/diary', element: <DiaryListPage /> },             // 내 일기목록(채팅)
      { path: '/community', element: <CommunityPage /> },         // 달래광장
      { path: '/profile', element: <ProfilePage /> },             // 마이페이지
    ],
  },
  // Navbar 없는 페이지
  {
    element: <PlainLayout />,
    children: [
      { path: '/diary/new', element: <DiaryCreatePage /> },       // 일기작성
      { path: '/diary/:id', element: <DiaryDetailPage />},        // 내 일기 상세 페이지
      { path: '/community/:id', element: <CommunityDetailPage />} // 달래광장 상세 페이지
    ],
  },
  // 로그인
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },                 // 로그인
      { path: '/signup', element: <SignupPage /> },               // 회원가입
    ],
  },
  // 잘못된 경로 처리
  { path: '*', element: <Navigate to="/" replace /> },
]);