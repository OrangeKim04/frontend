import { Container } from '@/components/styles/common';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import buttonIcon from '@/assets/recipeButton.svg';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RecipeBox } from '@/components/RecipeBox';
import cookIcon from '@/assets/recipe/cooking.svg';
import LoadingIndicator from '@/components/LoadingIndicator';
import { RecipeResponse } from './RecipeDetailPage';

const RecipePage = () => {
   const [keyword, setKeyword] = useState<string>('');

   const { ref, inView } = useInView({
      threshold: 0,
   });

   const navigate = useNavigate();
   const onsubmit = () => {
      if (keyword === '') {
         alert('재료를 입력해주세요');
      } else {
         navigate('/recipe/list', {
            state: { keyword },
         });
      }
   };
   const { data, isFetching, fetchNextPage, hasNextPage, isError } =
      useInfiniteQuery({
         queryKey: ['ScrappedRecipeList'],
         queryFn: async ({ pageParam }): Promise<RecipeResponse[]> => {
            sessionStorage.setItem('keyword', keyword);
            const response = await fetch(
               `https://zeropick.p-e.kr/recipes?page=${pageParam}&size=10`,
               {
                  method: 'GET',
                  credentials: 'include',
                  headers: {
                     accept: 'application/json',
                  },
               },
            );
            if (!response.ok) {
               throw new Error('검색 중 오류가 발생했습니다.'); // 오류 발생 시 예외 처리
            }
            const result = await response.json();
            console.log('스크랩 레시피 전체 조회', result.data.recipes);
            return result.data.recipes;
         },
         initialPageParam: 0,
         getNextPageParam: (lastPage, allPages) => {
            return lastPage.length < 10 ? undefined : allPages.length;
            // 한 페이지에 10개씩 올 때, 10개 미만이면 마지막으로 판단
         },
      });
   useEffect(() => {
      if (inView && hasNextPage) {
         fetchNextPage();
      }
   }, [fetchNextPage, inView, hasNextPage]);
   useEffect(() => {
      console.log('데이터에욥', data);
   }, [data]);
   return (
      <Container style={{ padding: '20px' }}>
         <Title>✏️ 건강한 레시피를 생성해 보세요!</Title>
         <Wrapper>
            <TextArea
               placeholder="ex) 계란 1개, 고구마 3개, 가지 2개, 오이 1개"
               value={keyword}
               onChange={e => setKeyword(e.target.value)}
            />
            <SubmitButton src={buttonIcon} onClick={onsubmit} />
         </Wrapper>
         <Title>🍴 저장한 레시피</Title>
         {isError ? (
            <>
               <Img src={cookIcon} />
               <Title>저장한 레시피가 없어요!</Title>
            </>
         ) : (
            <>
               {data?.pages[0].map((item, id) => (
                  <RecipeBox key={id} item={item} id={id} />
               ))}

               <LoadingIndicator ref={ref} isFetching={isFetching} />
            </>
         )}
      </Container>
   );
};
export default RecipePage;
const TextArea = styled.textarea`
   width: 85%;
   height: 100%;
   background-color: white;
   border: none;
   border-radius: 20px;
   outline: none;
   font-size: 0.9rem;
   font-family: Regular;
   padding: 20px;
   box-sizing: border-box;
   resize: none;
`;
const Title = styled.p`
   font-family: Bold;
   font-size: 1.5rem;
   margin: 0;
   width: 100%;
   padding: 0 5px;
   box-sizing: border-box;
   text-align: center;
   margin-bottom: 10px;
`;
const Wrapper = styled.div`
   position: relative;
   width: 100%;
   height: 60px;
   background-color: white;
   border-radius: 20px;
   margin-bottom: 20px;
`;

const SubmitButton = styled.img`
   position: absolute;
   bottom: 10px;
   right: 10px;
   width: 40px;
   height: 40px;
   cursor: pointer;
`;
const Img = styled.img`
   margin-top: 30px;
`;
