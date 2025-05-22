import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Title } from '@/components/styles/common';
import { RecipeBox } from '@/components/Recipe/RecipeBox';
import { customFetch } from '@/hooks/CustomFetch';
import RingLoading from '@/components/RingLoader';
import BackArrow from '@/components/BackArrow';
export type Recipe = {
   title: string;
   ingredients: string[];
};
const RecipeListPage = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { keyword } = location.state || {}; // null-safe 접근
   const [data, setData] = useState<Recipe[]>();
   useEffect(() => {
      const storedData = sessionStorage.getItem('recipeData');
      const storedKeyword = sessionStorage.getItem('recipeKeyword') || ''; // 없으면 빈 문자열

      // `storedKeyword`와 `keyword` 비교 (빈 문자열이거나 값이 다르면 새로 호출)
      if (storedKeyword !== keyword) {
         (async () => {
            try {
               const result = await customFetch(
                  '/recipes/suggest',
                  {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ ingredients: keyword }),
                  },
                  navigate,
               );
               console.log('레시피 추천 성공:', result);
               setData(result.data.suggestions);
               sessionStorage.setItem('recipeKeyword', keyword || '');
               sessionStorage.setItem(
                  'recipeData',
                  JSON.stringify(result.data.suggestions),
               );
            } catch (error) {
               console.error('레시피 추천 오류:', error);
            }
         })();
      } else {
         // `storedData`가 있을 경우 로드, 없으면 빈 배열
         if (storedData) {
            setData(JSON.parse(storedData));
         } else {
            setData([]); // 기존의 데이터가 없으면 빈 배열로 설정
         }
      }
   }, [keyword]);
   if (!data) return <RingLoading />;
   return (
      <Container>
         <BackArrow url="/recipe" />
         <Title>레시피 생성 완료!</Title>
         {data && data.map((item, id) => <RecipeBox key={id} item={item} />)}
      </Container>
   );
};
export default RecipeListPage;
