import { Container } from '@/components/styles/common';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import buttonIcon from '@/assets/recipeButton.svg';
import { RecipeBox } from '@/components/RecipeBox';
import cookIcon from '@/assets/recipe/cooking.svg';
import { RecipeResponse } from './RecipeDetailPage';
import { customFetch } from '@/hooks/CustomFetch';

const RecipePage = () => {
   const [keyword, setKeyword] = useState<string>('');
   const [data, setData] = useState<RecipeResponse[]>();

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

   // 저장된 레시피 최근 5개 조회
   const fetchSavedRecipe = async () => {
      try {
         const result = await customFetch(
            `/recipes/recent`,
            {
               method: 'GET',
               headers: {
                  accept: 'application/json',
               },
            },
            navigate,
         );
         console.log('스크랩 레시피 최신 5개 조회', result.data);
         setData(result.data);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   useEffect(() => {
      fetchSavedRecipe();
   }, []);
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

         {data ? (
            <>
               <Title>🍴 저장한 레시피</Title>
               {data?.map((item, id) => <RecipeBox key={id} item={item} />)}
            </>
         ) : (
            <>
               <Img src={cookIcon} />
               <Title>저장한 레시피가 없어요!</Title>
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
   margin-top: 20px;
   width: 200px;
`;
