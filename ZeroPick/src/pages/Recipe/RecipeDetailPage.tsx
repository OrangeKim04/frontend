import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  WhiteBox,
  ScrapIcon,
} from '@/components/styles/common';
import BackArrow from '@/components/BackArrow';
import { customFetch } from '@/hooks/CustomFetch';
import BeforeScrapIcon from '@/assets/recipe/스크랩 전.svg';
import AfterScrapIcon from '@/assets/recipe/스크랩 후.svg';
import styled from 'styled-components';
import RecipeDeleteModal from '@/components/Modal/RecipeDeleteModal';
import ProgressBar from '@/components/RingLoader';
import FoodImg from '@/components/FoodImg';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isScrapped, setIsscrapped] = useState(false);

  useEffect(() => {
    const fetchOrCreateRecipe = async () => {
      if (!item) return;

      if (item.id) {
        try {
          const result = await customFetch(
            `/recipes/${item.id}`,
            {
              method: 'GET',
              headers: {
                accept: 'application/json',
              },
            },
            navigate
          );
          console.log('레시피 단건 조회', result);
          setData(result.data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      } else {
        const stored = sessionStorage.getItem(item.title);

        if (stored) {
          console.log('스토리지에서 불러옴', stored);
          setData(JSON.parse(stored));
          const scrapped =
            sessionStorage.getItem(`${item.title}스크랩`) ?? 'false';

          if (scrapped === '저장') setIsscrapped(true);
        } else {
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
            console.log('레시피 생성 성공:', result);
            setData(result.data);
            sessionStorage.setItem(
              result.data.title,
              JSON.stringify(result.data)
            );
          } catch (error) {
            console.error('레시피 생성 오류:', error);
          }
        }
      }
    };

    fetchOrCreateRecipe();
  }, [item]);

  const ingredientsStr = data?.ingredients
    .map((item) => item.name)
    .join(',\u00A0');

  const stepItems =
    data?.steps?.split('\n').map((text, idx) => ({
      number: idx + 1,
      text: text.trim(),
    })) || [];

  const handleScrap = async () => {
    try {
      const result = await customFetch(
        `/recipes`,
        {
          method: 'POST',
          body: JSON.stringify({
            title: data?.title,
            ingredients: data?.ingredients,
            steps: data?.steps,
          }),
          headers: { 'Content-Type': 'application/json' },
        },
        navigate
      );
      console.log('스크랩 성공', result);
      setIsscrapped(true);
      alert('레시피가 저장되었어요');
      sessionStorage.setItem(`${item.title}스크랩`, '저장');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  if (!data) return <ProgressBar />;

  return (
    <Container>
      <Box>
        <BackArrow url={-1} />
        {!isScrapped && (
          <ScrapIcon
            src={data?.id ? AfterScrapIcon : BeforeScrapIcon}
            onClick={data?.id ? () => setIsModalOpen(true) : handleScrap}
            alt="Scrap Icon"
          />
        )}
      </Box>

      <WhiteBox>
        <StyledTitle>🍽️{data?.title}</StyledTitle>
        <FoodImg foodNm={data?.title} />
        <IngredientsContainer>
          <IngredientLabel>재료: {'\u00A0'} </IngredientLabel>
          <IngredientList>{ingredientsStr}</IngredientList>
        </IngredientsContainer>
        <StepsContainer>
          {stepItems.map((item, index) => (
            <StepItem key={index}>
              <StepNumber>{item.number}.</StepNumber>
              <StepText>{item.text}</StepText>
            </StepItem>
          ))}
        </StepsContainer>
      </WhiteBox>

      {isModalOpen && (
        <RecipeDeleteModal
          onClose={() => setIsModalOpen(false)}
          id={item.id}
        />
      )}
    </Container>
  );
};

export default RecipeDetailPage;

// ---------- Styled Components ----------
const StyledTitle = styled(Title)`
  text-align: center;
  margin: 0;
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
  line-height: 23px;
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
  gap: 4px;
`;

const Box = styled.div`
  margin-bottom: 40px;
`;

const StepNumber = styled.span`
  font-family: Regular;
`;

const StepText = styled.span`
  font-family: Regular;
  line-height: 20px;
`;
