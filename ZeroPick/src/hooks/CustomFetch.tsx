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
    return null;
  }

  if (response.status === 201) {
    return null;
  }

  if (response.status === 204) {
    navigate(-1);
    return null;
  }

  if (!response.ok) {
    throw new Error('요청 실패');
  }

  return response.json() as Promise<T>;
}
