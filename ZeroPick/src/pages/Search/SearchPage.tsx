import searchIcon from '@/assets/navbar/SearchB.svg';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/components/styles/common';
import Product from '@/components/Product';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingIndicator from '@/components/LoadingIndicator';
const SearchPage = () => {
   const [keyword, setKeyword] = useState(
      sessionStorage.getItem('keyword') || '',
   );
   const [searchParams] = useSearchParams();
   const { ref, inView } = useInView({
      threshold: 0,
   });
   const query = searchParams.get('');
   useEffect(() => {
      if (query !== null) {
         setKeyword(query);
      }
   }, [query]);

   const { data, isFetching, fetchNextPage, hasNextPage, isError } =
      useInfiniteQuery({
         queryKey: ['ProductList', keyword],
         queryFn: async ({
            pageParam,
         }): Promise<Array<{ foodNmKr: string; id: number }>> => {
            console.log('Current pageParam:', pageParam);
            sessionStorage.setItem('keyword', keyword);
            const response = await fetch(
               `https://zeropick.p-e.kr/api/v1/foods/search-names?name=${encodeURIComponent(keyword || '가')}&page=${pageParam}`,
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
            return await response.json();
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

   return (
      <Container
         style={{
            backgroundColor: 'white',
            padding: '20px',
            overflowY: 'auto',
         }}>
         <SearchBar>
            <Img src={searchIcon} />
            <Input
               placeholder="상품을 검색해 보세요"
               value={keyword}
               onChange={e => setKeyword(e.target.value)}
            />
         </SearchBar>
         <ItemList>
            {isError ? (
               <p style={{ textAlign: 'center' }}>검색 결과가 없습니다.</p>
            ) : (
               <>
                  {data?.pages?.map((page, pageIndex) =>
                     Array.isArray(page)
                        ? page.map((item, id) => (
                             <Product key={`${pageIndex}-${id}`} item={item} />
                          ))
                        : null,
                  )}
                  <LoadingIndicator ref={ref} isFetching={isFetching} />
               </>
            )}
         </ItemList>
      </Container>
   );
};
export default SearchPage;

const SearchBar = styled.div`
   width: 100%;
   background-color: #ededed;
   border-radius: 20px;
   box-sizing: border-box;
   display: flex;
   align-items: center;
   padding-left: 20px;
   position: relative;
`;
const Input = styled.input`
   width: 100%;
   height: 50px;
   background-color: #ededed;
   padding-left: 35px;
   box-sizing: border-box;
   border: none;
   border-radius: 20px;
   outline: none;
   font-family: Regular;
   font-size: 0.9rem;
   input::placeholder {
      color: gray;
   }
`;
const Img = styled.img`
   width: 26px;
   position: absolute;
   letf: 0;
   opacity: 0.4;
`;

const ItemList = styled.div`
   width: 100%;
   height: calc(100vh - 152px);
   display: flex;
   flex-direction: column;
`;
