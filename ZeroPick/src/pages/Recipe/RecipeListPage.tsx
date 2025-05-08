import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Title } from '@/components/styles/common';
import { RecipeBox } from '@/components/RecipeBox';
export type Recipe = {
   title: string;
   ingredients: string[];
};
const RecipeListPage = () => {
   const location = useLocation();

   const { keyword } = location.state || {}; // null-safe 접근
   const [data, setData] = useState<Recipe[]>();
   useEffect(() => {
      const storedData = sessionStorage.getItem('recipeData');
      const storedKeyword = sessionStorage.getItem('recipeKeyword') || ''; // 없으면 빈 문자열

      // `storedKeyword`와 `keyword` 비교 (빈 문자열이거나 값이 다르면 새로 호출)
      if (storedKeyword !== keyword) {
         (async () => {
            try {
               const response = await fetch(
                  'https://zeropick.p-e.kr/recipes/suggest',
                  {
                     method: 'POST',
                     credentials: 'include',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ ingredients: keyword }),
                  },
               );
               if (!response.ok) throw new Error('레시피 추천 실패');
               const result = await response.json();
               console.log('레시피 추천 성공:', result);
               setData(result.data.suggestions);
               sessionStorage.setItem('recipeKeyword', keyword || ''); // `keyword`가 null일 경우 빈 문자열 처리
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

   return (
      <Container>
         <Title>레시피 생성 완료!</Title>
         {data &&
            data.map((item, id) => <RecipeBox key={id} item={item} id={id} />)}
      </Container>
   );
};
export default RecipeListPage;
