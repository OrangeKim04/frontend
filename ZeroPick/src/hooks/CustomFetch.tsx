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

   if (response.status === 401) {
      navigate('/login');
      return;
   }

   if (!response.ok) {
      throw new Error('요청 실패');
   }

   return response.json();
};
