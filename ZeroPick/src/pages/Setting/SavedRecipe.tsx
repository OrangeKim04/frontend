import { Container, Title } from '@/components/styles/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RecipeBox } from '@/components/RecipeBox';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '@/components/LoadingIndicator';
import { customFetch } from '@/hooks/CustomFetch';
import { RecipeResponse } from '@/pages/Recipe/RecipeDetailPage';

const SavedRecipe = () => {
   const { ref, inView } = useInView({
      threshold: 0,
   });
   const navigate = useNavigate();
   const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
      queryKey: ['SavedRecipes'],
      queryFn: async ({ pageParam }) => {
         console.log('Current pageParam:', pageParam);

         const result = await customFetch(
            `/recipes?page=${pageParam}&size=10`,
            {
               method: 'GET',
               headers: { accept: 'application/json' },
            },
            navigate,
         );
         return result;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
         return lastPage.data.recipes.length < 10 ? undefined : allPages.length;
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
         <Title>저장된 레시피</Title>
         {data?.pages?.map(page =>
            page?.data?.recipes?.map((item: RecipeResponse, id: number) => (
               <RecipeBox key={id} item={item} />
            )),
         )}

         <LoadingIndicator ref={ref} isFetching={isFetching} />
      </Container>
   );
};
export default SavedRecipe;
