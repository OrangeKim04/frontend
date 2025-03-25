import '@/font.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import SplashPage from '@/pages/SplashPage';
import RootLayout from '@/layout/RootLayout';
import HomePage from '@/pages/HomePage';
import RecipePage from './pages/RecipePage';
import SearchPage from './pages/SearchPage';
import CommunityPage from './pages/CommunityPage';
import SettingPage from './pages/SettingPage';
const router = createBrowserRouter([
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/signup',
      element: <SignUpPage />,
   },
   {
      path: '/', // 루트 경로
      element: <RootLayout />,
      children: [
         { index: true, element: <SplashPage /> }, // 기본 경로
         { path: 'home', element: <HomePage /> }, // /home 경로 추가
         { path: 'recipe', element: <RecipePage /> },
         { path: 'search', element: <SearchPage /> },
         { path: 'community', element: <CommunityPage /> },
         { path: 'setting', element: <SettingPage /> },
      ],
   },
]);

function App() {
   return (
      <>
         {' '}
         <RouterProvider router={router} />
      </>
   );
}

export default App;
