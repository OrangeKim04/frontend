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
  const { keyword } = location.state || {};
  const [data, setData] = useState<Recipe[]>();

  useEffect(() => {
    const storedData = sessionStorage.getItem('recipeData');
    const storedKeyword = sessionStorage.getItem('recipeKeyword') || '';

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
            navigate
          );

          const typed = result as { data: { suggestions: Recipe[] } };
          console.log('레시피 추천 성공:', typed);
          setData(typed.data.suggestions);
          sessionStorage.setItem('recipeKeyword', keyword || '');
          sessionStorage.setItem(
            'recipeData',
            JSON.stringify(typed.data.suggestions)
          );
        } catch (error) {
          console.error('레시피 추천 오류:', error);
        }
      })();
    } else {
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setData([]);
      }
    }
  }, [keyword]);

  if (!data) return <p>loading...</p>;

  return (
    <Container>
      <Title>레시피 생성 완료!</Title>
      {data.map((item, id) => (
        <RecipeBox key={id} item={item} id={id} />
      ))}
    </Container>
  );
};

export default RecipeListPage;
