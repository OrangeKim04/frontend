import '@/font.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import SplashPage from '@/pages/SplashPage';
const router = createBrowserRouter([
   {
      path: '/', // 첫 로딩 시 스플래시 페이지
      element: <SplashPage />,
   },
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/signup',
      element: <SignUpPage />,
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
