import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import home from '@/assets/homeG.svg';
import recipe from '@/assets/forkG.svg';
import community from '@/assets/HeartG.svg';
import setting from '@/assets/SettingG.svg';
import search from '@/assets/SearchG.svg';
import homeActive from '@/assets/homeB.svg';
import recipeActive from '@/assets/forkB.svg';
import communityActive from '@/assets/HeartB.svg';
import settingActive from '@/assets/SettingB.svg';
import searchActive from '@/assets/SearchB.svg';
const RootLayout = () => {
   const categories = [
      {
         title: '홈',
         link: '/home',
         icon: home, // 기본 아이콘
         activeIcon: homeActive, // 활성 상태 아이콘
      },
      {
         title: '레시피',
         link: '/recipe',
         icon: recipe,
         activeIcon: recipeActive,
      },
      {
         title: '검색',
         link: '/search',
         icon: search,
         activeIcon: searchActive,
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

   const [selected, setSelected] = useState<string>(localStorage.getItem('selectedCategory') || '홈');
   const handleClick = (title: string) => {
      setSelected(title);
      localStorage.setItem('selectedCategory', title);
   };

   return (
      <RootContainer>
         <Outlet />

         <Nav>
            {categories.map((category, index) => (
               <Item key={index} to={category.link} onClick={() => handleClick(category.title)}>
                  <Img src={selected === category.title ? category.activeIcon : category.icon} />
                  <NavText isActive={selected === category.title}>{category.title}</NavText>
               </Item>
            ))}
            {/*   <Item>
               <Img src={setting} />
               <NavText>설정</NavText>
            </Item> */}
         </Nav>
      </RootContainer>
   );
};

export default RootLayout;

// Styled Components
const RootContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 100vh;
   width: 100%;
`;

const Nav = styled.div`
   width: 100%;
   height: 80px;
   border-top: 1px solid #f1f1f1;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 20px;
   box-sizing: border-box;
   position: absolute;
   bottom: 0;
`;
const Img = styled.img`
   width: 24px;
`;
const Item = styled(Link)`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 49px;
   height: 46px;
   align-items: center;
   cursor: pointer;
   text-decoration: none;
`;
const NavText = styled.p<{ isActive: boolean }>`
   margin: 0;
   font-size: 12px;
   font-family: SemiBold;
   color: ${({ isActive }) => (isActive ? 'black' : '#B3B3B3 ')};
`;
