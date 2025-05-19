import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import home from '@/assets/navbar/homeG.svg';
import recipe from '@/assets/navbar/forkG.svg';
import community from '@/assets/navbar/HeartG.svg';
import setting from '@/assets/navbar/SettingG.svg';
import search from '@/assets/navbar/SearchG.svg';
import homeActive from '@/assets/navbar/homeB.svg';
import recipeActive from '@/assets/navbar/forkB.svg';
import communityActive from '@/assets/navbar/HeartB.svg';
import settingActive from '@/assets/navbar/SettingB.svg';
import searchActive from '@/assets/navbar/SearchB.svg';
const RootLayout = () => {
   const location = useLocation();

   const categories = [
      {
         title: '홈',
         link: '/home',
         icon: home, // 기본 아이콘
         activeIcon: homeActive, // 활성 상태 아이콘
      },
      {
         title: '검색',
         link: '/search',
         icon: search,
         activeIcon: searchActive,
      },
      {
         title: '레시피',
         link: '/recipe',
         icon: recipe,
         activeIcon: recipeActive,
      },

      {
         title: '커뮤니티',
         link: '/community',
         icon: community,
         activeIcon: communityActive,
      },
      {
         title: '설정',
         link: '/setting',
         icon: setting,
         activeIcon: settingActive,
      },
   ];
   const [selected, setSelected] = useState<string>(
      sessionStorage.getItem('selectedCategory') || '홈',
   );
   const handleClick = (title: string) => {
      setSelected(title);
      sessionStorage.setItem('selectedCategory', title);
   };
   useEffect(() => {
      console.log(sessionStorage.getItem('selectedCategory'));
   }, [location.pathname]);

   return (
      <RootContainer>
         <Outlet />
         <Nav>
            {categories.map((category, index) => (
               <Item
                  key={index}
                  to={category.link}
                  onClick={() => handleClick(category.title)}>
                  <Img
                     src={
                        selected === category.title
                           ? category.activeIcon
                           : category.icon
                     }
                  />
                  <NavText isActive={selected === category.title}>
                     {category.title}
                  </NavText>
               </Item>
            ))}
         </Nav>
      </RootContainer>
   );
};

export default RootLayout;

// Styled Components
const RootContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 100dvh;
   width: 100%;
   overflow-y: hidden; /* 세로 스크롤 비활성화 */
`;

const Nav = styled.div`
   width: 100%;
   height: 70px;
   border-top: 1px solid #f1f1f1;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 20px;
   box-sizing: border-box;
   position: fixed;
   bottom: 0;
   z-index: 10;
   background-color: white;
   border-radius: 15px;
`;
const Img = styled.img`
   width: 23px;
`;
const Item = styled(Link)`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 49px;
   height: 44px;
   align-items: center;
   cursor: pointer;
   text-decoration: none;
`;
const NavText = styled.p<{ isActive: boolean }>`
   margin: 0;
   font-size: 12px;
   font-family: SemiBold;
   color: ${({ isActive }) => (isActive ? 'black' : '#808080 ')};
`;
