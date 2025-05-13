import { NavigateFunction } from 'react-router-dom';

const BASE_URL = 'https://zeropick.p-e.kr/api/v1';

export const customFetch = async (
   endpoint: string,
   options: RequestInit,
   navigate: NavigateFunction,
) => {
   const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
   });

   const data = await response.json().catch(() => null);

   if (response.status === 401) {
      navigate('/login');
      sessionStorage.setItem('selectedCategory', '홈');
      return;
   }

   if (!response.ok) {
      const error = new Error(data?.message || '요청 실패');
      Object.assign(error, {
         status: response.status,
         statusText: response.statusText,
         detail: data?.detail,
         errorCode: data?.errorCode,
         raw: data,
      });
      throw error;
   }

   return data;
};
