import { NavigateFunction } from 'react-router-dom';

export const logout = async (navigate: NavigateFunction) => {
   try {
      const response = await fetch('https://zeropick.p-e.kr/user/logout', {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error('로그아웃 실패');
      }

      const result = await response.json();
      console.log('로그아웃 성공:', result);
      navigate('/login');
   } catch (error) {
      console.error('로그아웃 오류:', error);
   }
};
