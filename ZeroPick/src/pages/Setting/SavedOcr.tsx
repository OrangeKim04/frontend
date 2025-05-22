import { Container, Title } from '@/components/styles/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '@/components/LoadingIndicator';
import { customFetch } from '@/hooks/CustomFetch';
import Product from '@/components/Product';
import BackArrow from '@/components/BackArrow';
import { ProductType } from '@/components/Product';

const SavedOCR = () => {
   const { ref, inView } = useInView({
      threshold: 0,
   });
   const navigate = useNavigate();
   const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
      queryKey: ['SavedRecipes'],
      queryFn: async ({ pageParam }) => {
         console.log('Current pageParam:', pageParam);

         const result = await customFetch(
            `/ocr?page=${pageParam}&size=10`,
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
         if (!lastPage || !Array.isArray(lastPage.content)) return undefined;
         return lastPage.content.length < 10 ? undefined : allPages.length;
      },
   });
   useEffect(() => {
      if (inView && hasNextPage) {
         fetchNextPage();
      }
   }, [fetchNextPage, inView, hasNextPage]);
   useEffect(() => {
      if (data) console.log(data?.pages[0].content);
   }, [data]);
   return (
      <Container
         style={{
            backgroundColor: 'white',
            padding: '20px',
            overflowY: 'auto',
         }}
      >
         <BackArrow url="/setting" />
         <Title>저장된 분석 결과</Title>
         {data?.pages?.map(page => {
            if (page?.content && Array.isArray(page.content)) {
               return page.content.map((item: ProductType, id: number) => (
                  <Product
                     key={id}
                     foodNmKr={item.foodNmKr}
                     foodId={item.foodId}
                  />
               ));
            }
            return null;
         })}

         <LoadingIndicator ref={ref} isFetching={isFetching} />
      </Container>
   );
};
export default SavedOCR;
