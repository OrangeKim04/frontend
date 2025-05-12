import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Title, WhiteBox } from '@/components/styles/common';
import BackArrow from '@/components/BackArrow';
import { customFetch } from '@/hooks/CustomFetch';
/* import BeforeScrapIcon from '@/assets/recipe/스크랩 전.svg';
import AfterScrapIcon from '@/assets/recipe/스크랩 후.svg'; */
import styled from 'styled-components';
type Ingredient = {
   name: string;
};

export type RecipeResponse = {
   id?: string;
   title: string;
   ingredients: Ingredient[];
   steps?: string;
};

const RecipeDetailPage = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const item = location.state?.item;
   const [data, setData] = useState<RecipeResponse | null>(null);
   /* const [scrapped, setScrapped] = useState(false); */
   useEffect(() => {
      if (item) {
         if (item.steps) {
            console.log('스크랩된 레시피 조회');
            setData(item);
         } else {
            const createRecipe = async () => {
               try {
                  const ingredientsStr = item.ingredients.join(',\u00A0');
                  const result = await customFetch(
                     '/recipes/createRecipe',
                     {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                           title: item.title,
                           ingredients: ingredientsStr,
                        }),
                     },
                     navigate,
                  );
                  console.log('레시피 생성 성공:', result);
                  setData(result.data);
                  sessionStorage.setItem(
                     result.data.title,
                     JSON.stringify(result.data),
                  );
               } catch (error) {
                  console.error('레시피 생성 오류:', error);
               }
            };

            const stored = sessionStorage.getItem(item.title);
            if (stored) {
               setData(JSON.parse(stored));
            } else {
               createRecipe();
            }
         }
      }
   }, [item]);
   const ingredientsStr = data?.ingredients
      .map(item => item.name)
      .join(',\u00A0');

   const stepItems = data?.steps
      ? data.steps.split('\n').map(step => {
           const [number, ...text] = step.split('. ');
           return { number, text: text.join('. ') };
        })
      : [];

   /* const handleScrap = async () => {
      setScrapped(!scrapped);
      try {
         const response = await fetch(`https://zeropick.p-e.kr/recipes`, {
            method: 'POST',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               title: data?.title,
               ingredients: data?.ingredients,
               steps: data?.steps,
            }),
         });
         if (!response.ok) throw new Error('Network response was not ok');
         const result = await response.json();
         console.log('스크랩 성공', result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   }; */

   if (!data) return <p>Loading...</p>;
   return (
      <Container>
         <Box>
            <BackArrow url={-1} />
            {/*  <ScrapIcon
               src={scrapped ? AfterScrapIcon : BeforeScrapIcon}
               onClick={handleScrap}
               alt="Scrap Icon"
            /> */}
         </Box>

         <WhiteBox>
            <StyledTitle>{data?.title}</StyledTitle>
            <IngredientsContainer>
               <IngredientLabel>
                  재료: {'\u00A0'}
                  {'\u00A0'}
               </IngredientLabel>
               <IngredientList>{ingredientsStr}</IngredientList>
            </IngredientsContainer>
            <StepsContainer>
               {stepItems.map((item, index) => (
                  <StepItem key={index}>
                     <StepNumber>
                        {item.number}. {'\u00A0'}
                     </StepNumber>
                     <StepText>{item.text}</StepText>
                  </StepItem>
               ))}
            </StepsContainer>
         </WhiteBox>
      </Container>
   );
};
export default RecipeDetailPage;
const StyledTitle = styled(Title)`
   text-align: center;
`;
const IngredientsContainer = styled.div`
   display: flex;
   width: 100%;
   padding: 15px;
   box-sizing: border-box;
`;

const IngredientLabel = styled.p`
   font-family: Medium;
   font-size: 1.1rem;
   white-space: nowrap;
   margin-right: 5px;
   margin: 0;
`;

const IngredientList = styled.p`
   font-family: Medium;
   font-size: 1.1rem;
   font-family: Regular;
   margin: 0;
`;

const StepsContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;
   padding: 15px;
   width: 100%;
   box-sizing: border-box;
`;

const StepItem = styled.div`
   display: flex;
`;
const Box = styled.div`
   margin-bottom: 50px;
`;

const StepNumber = styled.span`
   font-family: Regular;
`;

const StepText = styled.span`
   font-family: Regular;
   line-height: 20px;
`;
/* const ScrapIcon = styled.img`
   width: 18px;
   position: absolute;
   right: 20px;
   top: 22px;
   cursor: pointer;
`;
 */
