import searchIcon from '@/assets/navbar/SearchB.svg';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/styles/common';
import Product from '@/components/Product';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingIndicator from '@/components/LoadingIndicator';
import { customFetch } from '@/hooks/CustomFetch';

const SearchPage = () => {
  const [keyword, setKeyword] = useState(sessionStorage.getItem('keyword') || '');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { ref, inView } = useInView({ threshold: 0 });
  const query = searchParams.get('');

  useEffect(() => {
    if (query !== null) {
      setKeyword(query);
    }
  }, [query]);

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['ProductList', keyword],
    queryFn: async ({ pageParam }): Promise<Array<{ foodNmKr: string; id: number }>> => {
      console.log('Current pageParam:', pageParam);
      sessionStorage.setItem('keyword', keyword);
      const result = await customFetch(
        `/foods/search-names?name=${encodeURIComponent(keyword || '가')}&page=${pageParam}`,
        {
          method: 'GET',
          headers: { accept: 'application/json' },
        },
        navigate
      );
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 10 ? undefined : allPages.length;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <Container
      style={{
        backgroundColor: 'white',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
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
                    <Product
                      key={`${pageIndex}-${id}`}
                      foodNmKr={item.foodNmKr}
                      foodId={item.id}
                    />
                  ))
                : null
            )}
            <LoadingIndicator ref={ref} isFetching={isFetching} />
          </>
        )}
      </ItemList>
    </Container>
  );
};

export default SearchPage;

// ---------- Styled Components ----------
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
  left: 0;
  opacity: 0.4;
`;

const ItemList = styled.div`
  width: 100%;
  height: calc(100dvh - 152px);
  display: flex;
  flex-direction: column;
`;
