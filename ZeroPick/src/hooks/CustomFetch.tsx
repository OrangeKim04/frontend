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
    const text = await response.text();
    let errorMessage = '요청 실패';

    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData?.message || errorMessage;
    } catch {
      errorMessage = text;
    }

    const error = new Error(errorMessage);
    Object.assign(error, {
      status: response.status,
      statusText: response.statusText,
    });
    throw error;
  }

  const data: T = await response.json();
  return data;
}
