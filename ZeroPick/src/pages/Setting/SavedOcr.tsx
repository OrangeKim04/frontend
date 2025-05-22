// src/pages/Setting/SavedOcr.tsx

import { Container, Title } from '@/components/styles/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '@/components/LoadingIndicator';
import { customFetch } from '@/hooks/CustomFetch';
import Product from '@/components/Product';
import BackArrow from '@/components/BackArrow';
import { ProductItem } from '@/components/Product'; // 단일 아이템 타입

// ✅ OCR 응답 타입
type SavedOCRResponse = {
  content: ProductItem[];
  last: boolean;
  totalPages: number;
};

const SavedOCR = () => {
  const { ref, inView } = useInView({ threshold: 0 });
  const navigate = useNavigate();

  // ✅ useInfiniteQuery에서 반환 타입 명시
  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<SavedOCRResponse>({
    queryKey: ['SavedRecipes'],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await customFetch<SavedOCRResponse>(
        `/ocr?page=${pageParam}&size=10`,
        {
          method: 'GET',
          headers: { accept: 'application/json' },
        },
        navigate
      );
      if (!result) throw new Error('데이터를 불러오지 못했습니다.');
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: SavedOCRResponse, allPages: SavedOCRResponse[]) => {
      if (!lastPage || !Array.isArray(lastPage.content)) return undefined;
      return lastPage.content.length < 10 ? undefined : allPages.length;
    },
  });

  // ✅ 무한 스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  // ✅ 첫 페이지 로그
  useEffect(() => {
    if (data) {
      const firstPage = data.pages?.[0] as SavedOCRResponse;
      console.log(firstPage.content);
    }
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

      {data?.pages?.map((page, pageIndex) => {
        const typedPage = page as SavedOCRResponse;
        if (typedPage.content && Array.isArray(typedPage.content)) {
          return typedPage.content.map((item, id) => (
            <Product
              key={`${pageIndex}-${id}`}
              item={{ foodId: item.foodId, foodNmKr: item.foodNmKr }}
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
