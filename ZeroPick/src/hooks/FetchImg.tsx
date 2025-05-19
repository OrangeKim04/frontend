import { customFetch } from './CustomFetch';
import { NavigateFunction } from 'react-router-dom';

const BASE_URL = '/api/v1';

export const FetchImg = async (foodNm: string, navigate: NavigateFunction) => {
   try {
      const imageUrl = await customFetch(
         `/image-search?query=${foodNm}`,
         {
            method: 'GET',
            headers: { accept: 'application/json' },
         },
         navigate,
      );
      console.log('이미지 조회 성공', imageUrl);
      if (imageUrl) {
         try {
            const result = await fetch(`${BASE_URL}/proxy?url=${imageUrl}`, {
               method: 'GET',
               headers: { accept: 'application/json' },
               credentials: 'include',
            });

            if (!result.ok) {
               console.error(`이미지 변환 실패: ${result.status}`);
               return null;
            }

            console.log('이미지 변환 성공', result.url);
            return result.url;
         } catch (error) {
            console.error('이미지 변환 실패', error);
            return null;
         }
      }
   } catch (error) {
      console.error('이미지 조회 실패', error);
   }
};
