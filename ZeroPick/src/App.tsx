import '@/font.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRef, createRef, RefObject } from 'react';
import SplashPage from '@/pages/SplashPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import CameraPage from '@/pages/Home/CameraPage';
import AnalysisPage from '@/pages/Home/AnalysisPage';
import RootLayout from '@/layout/RootLayout';
import HomePage from '@/pages/Home/HomePage';
import RecipePage from './pages/Recipe/RecipePage';
import SearchPage from './pages/Search/SearchPage';
import ProductDetailPage from './pages/Search/ProductDetailPage';
import CommunityPage from './pages/Community/CommunityPage';
import WritePostPage from './pages/Community/WritePostPage';
import PostDetailPage from './pages/Community/PostDetailPage';
import EditPostPage from './pages/Community/EditPostPage';
import SettingPage from './pages/Setting/SettingPage';
import SavedRecipe from './pages/Setting/SavedRecipe';
import SavedOCR from './pages/Setting/SavedOcr';
import MyWritePost from './pages/Setting/MyWritePost';
import CommunityLikes from './pages/Setting/CommunityLikes';
import RecipeListPage from './pages/Recipe/RecipeListPage';
import RecipeDetailPage from './pages/Recipe/RecipeDetailPage';
import { Analytics } from '@vercel/analytics/react';
import './styles.css'; // 애니메이션 클래스 정의용

const queryClient = new QueryClient();

function AnimatedRoutes() {
   const location = useLocation();
   const nodeRefMap = useRef<Map<string, RefObject<HTMLDivElement | null>>>(
      new Map(),
   );

   if (!nodeRefMap.current.has(location.pathname)) {
      nodeRefMap.current.set(location.pathname, createRef<HTMLDivElement>());
   }
   const nodeRef = nodeRefMap.current.get(location.pathname)!;

   return (
      <TransitionGroup component={null}>
         <CSSTransition
            key={location.pathname}
            classNames="page"
            timeout={300}
            nodeRef={nodeRef}
            unmountOnExit>
            <div ref={nodeRef} className="page">
               <Routes location={location}>
                  <Route path="/" element={<SplashPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/camera" element={<CameraPage />} />
                  <Route path="/home/result" element={<AnalysisPage />} />

                  <Route path="/" element={<RootLayout />}>
                     <Route path="home" element={<HomePage />} />
                     <Route path="search" element={<SearchPage />} />
                     <Route path="recipe" element={<RecipePage />} />
                     <Route path="recipe/list" element={<RecipeListPage />} />
                     <Route
                        path="recipe/:title"
                        element={<RecipeDetailPage />}
                     />
                     <Route path=":id" element={<ProductDetailPage />} />
                     <Route path="community" element={<CommunityPage />} />
                     <Route
                        path="community/write"
                        element={<WritePostPage />}
                     />
                     <Route
                        path="community/post/:postId"
                        element={<PostDetailPage />}
                     />
                     <Route
                        path="community/edit/:postId"
                        element={<EditPostPage />}
                     />
                     <Route path="setting" element={<SettingPage />} />
                     <Route path="setting/recipes" element={<SavedRecipe />} />
                     <Route path="setting/ocr" element={<SavedOCR />} />
                     <Route path="setting/mypost" element={<MyWritePost />} />
                     <Route path="setting/likes" element={<CommunityLikes />} />
                  </Route>
               </Routes>
            </div>
         </CSSTransition>
      </TransitionGroup>
   );
}

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <AnimatedRoutes />
            <Analytics />
         </BrowserRouter>
      </QueryClientProvider>
   );
}

export default App;
