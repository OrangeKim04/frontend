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
import CameraPage from './pages/CameraPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WritePostPage from '@/pages/WritePostPage'; // 추가: 게시글 작성 페이지 import
import PostDetailPage from '@/pages/PostDetailPage';

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
      path: '/camera',
      element: <CameraPage />,
   },
   {
      path: '/', // 루트 경로
      element: <RootLayout />,
      children: [
         { index: true, element: <SplashPage /> }, // 기본 경로
         { path: 'home', element: <HomePage /> }, // /home 경로 추가
         { path: 'recipe', element: <RecipePage /> },
         { path: 'search', element: <SearchPage /> },
         { path: 'search/:id', element: <ProductDetailPage /> },
         { path: 'community', element: <CommunityPage /> },
         { path: 'community/write', element: <WritePostPage /> },
         { path: 'community/post/:postId', element: <PostDetailPage /> },
         { path: 'setting', element: <SettingPage /> },
         { path: 'write', element: <WritePostPage /> }, // 추가: 게시글 작성 페이지 경로
      ],
   },
]);

function App() {
   return (
      <>
         <RouterProvider router={router} />
      </>
   );
}

export default App;
