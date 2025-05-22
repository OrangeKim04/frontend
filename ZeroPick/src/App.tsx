import '@/font.css';
/* import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import SplashPage from '@/pages/SplashPage';
import RootLayout from '@/layout/RootLayout';
import HomePage from '@/pages/Home/HomePage';
import RecipePage from './pages/Recipe/RecipePage';
import SearchPage from './pages/Search/SearchPage';
import CommunityPage from './pages/Community/CommunityPage';
import SettingPage from './pages/Setting/SettingPage';
import CameraPage from './pages/Home/CameraPage';
import ProductDetailPage from './pages/Search/ProductDetailPage';
import AnalysisPage from './pages/Home/AnalysisPage';
import RecipeListPage from './pages/Recipe/RecipeListPage';
import RecipeDetailPage from './pages/Recipe/RecipeDetailPage';
import WritePostPage from './pages/Community/WritePostPage';
import MyWritePost from './pages/Setting/MyWritePost';
import CommunityLikes from './pages/Setting/CommunityLikes';
import PostDetailPage from './pages/Community/PostDetailPage';
import EditPostPage from './pages/Community/EditPostPage';
import SavedRecipe from './pages/Setting/SavedRecipe';
import SavedOCR from './pages/Setting/SavedOcr';

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
   { path: '/home/result', element: <AnalysisPage /> },
   {
      path: '/', // 루트 경로
      element: <RootLayout />,
      children: [
         { index: true, element: <SplashPage /> }, // 기본 경로
         { path: 'home', element: <HomePage /> }, // /home 경로 추가
         { path: 'recipe', element: <RecipePage /> },
         { path: 'search', element: <SearchPage /> },
         { path: '/:id', element: <ProductDetailPage /> },
         { path: 'community', element: <CommunityPage /> },
         { path: 'community/write', element: <WritePostPage /> },
         { path: 'community/post/:postId', element: <PostDetailPage /> },
         { path: 'community/edit/:postId', element: <EditPostPage /> },
         { path: 'setting', element: <SettingPage /> },
         { path: 'recipe/list', element: <RecipeListPage /> },
         { path: 'recipe/:title', element: <RecipeDetailPage /> },
         { path: 'setting/recipes', element: <SavedRecipe /> },
         { path: 'setting/ocr', element: <SavedOCR /> },
         { path: 'setting/mypost', element: <MyWritePost /> },
         { path: 'setting/likes', element: <CommunityLikes /> },
      ],
   },
]);
const queryClient = new QueryClient();
function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
         {/*      <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
   );
}

export default App;
