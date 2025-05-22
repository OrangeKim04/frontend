// hooks/useNews.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '@/hooks/CustomFetch';

type NewsItem = {
   title: string;
   link: string;
};

export const useNews = () => {
   const [data, setData] = useState<NewsItem[]>([]);

   const navigate = useNavigate();

   const fetchNews = async () => {
      try {
         const result = await customFetch('/news', { method: 'GET' }, navigate);
         console.log('뉴스 조회 성공', result);
         setData(result || []);
      } catch (err) {
         console.error('뉴스 조회:', err);
      }
   };

   useEffect(() => {
      fetchNews();
   }, []);

   return { data };
};
