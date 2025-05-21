import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Title, WhiteBox } from '@/components/styles/common';
import BackArrow from '@/components/BackArrow';
import { customFetch } from '@/hooks/CustomFetch';
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
              navigate
            );

            const typed = result as { data: RecipeResponse };
            console.log('레시피 생성 성공:', typed);
            setData(typed.data);
            sessionStorage.setItem(typed.data.title, JSON.stringify(typed.data));
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

  if (!data) return <p>Loading...</p>;

  return (
    <Container>
      <Box>
        <BackArrow url={-1} />
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

// ---------- Styled Components ----------
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
  font-family: Regular;
  font-size: 1.1rem;
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
