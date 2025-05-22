import { Container } from '@/components/styles/common';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import buttonIcon from '@/assets/recipeButton.svg';
import { RecipeBox } from '@/components/Recipe/RecipeBox';
import cookIcon from '@/assets/recipe/cooking.svg';
import { RecipeResponse } from './RecipeDetailPage';
import { customFetch } from '@/hooks/CustomFetch';

const RecipePage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<RecipeResponse[]>();
  const [loading, setLoading] = useState(true);
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

  const fetchSavedRecipe = async () => {
    try {
      const result = await customFetch<{ data: RecipeResponse[] }>(
        `/recipes/recent`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        },
        navigate
      );

      if (!result) return;

      console.log('스크랩 레시피 최신 5개 조회', result.data);
      setData(result.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRecipe();
  }, []);

  return (
    <Container style={{ padding: '20px' }}>
      <Title>✏️건강한 레시피를 생성해 보세요!</Title>
      <Wrapper>
        <TextArea
          placeholder="ex) 계란 1개, 고구마 3개, 가지 2개, 오이 1개"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <SubmitButton src={buttonIcon} onClick={onsubmit} />
      </Wrapper>

      {loading ? null : data && data.length > 0 ? (
        <>
          <Title>🍴저장한 레시피</Title>
          {data.map((item, id) => (
            <RecipeBox key={id} item={item} id={id} /> // ✅ id 추가됨
          ))}
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

// ---------- Styled Components ----------

const Title = styled.p`
  margin: 0;
  font-family: SemiBold;
  font-size: 1.4rem;
  text-align: center;
  margin: 20px 0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const TextArea = styled.textarea`
  font-family: Regular;
  flex: 1;
  resize: none;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  height: 60px;
  font-size: 1rem;
`;

const SubmitButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px auto;
  display: block;
`;
