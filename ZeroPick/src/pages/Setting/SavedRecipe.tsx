import { Container, Title } from '@/components/styles/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RecipeBox } from '@/components/Recipe/RecipeBox';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '@/components/LoadingIndicator';
import { customFetch } from '@/hooks/CustomFetch';
import { RecipeResponse } from '@/pages/Recipe/RecipeDetailPage';
import BackArrow from '@/components/BackArrow';

type SavedRecipeResponse = {
  data: RecipeResponse[];
  last: boolean;
};

const SavedRecipe = () => {
  const { ref, inView } = useInView({ threshold: 0 });
  const navigate = useNavigate();

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['SavedRecipes'],
    queryFn: async ({ pageParam }): Promise<SavedRecipeResponse> => {
      console.log('Current pageParam:', pageParam);

      const result = await customFetch<SavedRecipeResponse>(
        `/recipes?page=${pageParam}&size=10`,
        {
          method: 'GET',
          headers: { accept: 'application/json' },
        },
        navigate
      );
      if (!result) throw new Error('레시피조회실패');
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage.data)) return undefined;
      return lastPage.data.length < 10 ? undefined : allPages.length;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  useEffect(() => {
    console.log(data?.pages);
  }, [data]);

  return (
    <Container>
      <BackArrow url="/setting" />
      <Title>저장된 레시피</Title>

      {data?.pages?.map((page, pageIndex) => {
        if (page?.data && Array.isArray(page.data)) {
          return page.data.map((item: RecipeResponse, id: number) => (
            <RecipeBox key={`${pageIndex}-${id}`} item={item} id={id} />
          ));
        }
        return null;
      })}

      <LoadingIndicator ref={ref} isFetching={isFetching} />
    </Container>
  );
};

export default SavedRecipe;
