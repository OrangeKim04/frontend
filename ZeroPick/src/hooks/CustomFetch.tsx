import { NavigateFunction } from 'react-router-dom';

const BASE_URL = '/api/v1';

export async function customFetch<T>(
   endpoint: string,
   options: RequestInit,
   navigate: NavigateFunction,
): Promise<T | null> {
   const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      credentials: 'include',
   });

   if (response.status === 401) {
      navigate('/login');
      sessionStorage.setItem('selectedCategory', '홈');
      return;
   }

   let data;
   const text = await response.text();
   try {
      data = JSON.parse(text); // JSON이면 파싱
   } catch {
      data = text; // 아니면 그냥 문자열로 처리
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
}
