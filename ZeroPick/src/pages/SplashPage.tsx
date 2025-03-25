import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import checkIcon from '@/assets/Check.svg';
import searchIcon from '@/assets/Search.svg';
import basketIcon from '@/assets/Basket.svg';
const SplashPage = () => {
   const navigate = useNavigate();

   // useEffect로 2초 후에 로그인 페이지로 이동하도록 설정
   useEffect(() => {
      const timer = setTimeout(() => {
         navigate('/login'); // 일정 시간 후 랜딩 페이지로 이동
      }, 3900); // 3초 후 이동

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
   }, [navigate]);
   const icons = [checkIcon, searchIcon, basketIcon];
   return (
      <Container>
         <Logo>제로픽</Logo>
         <Tagline>영양성분부터 대체당까지 분석해요</Tagline>
         <IconWrapper>
            {icons.map((icon, index) => (
               <Icon key={index} src={icon} className={`icon${index + 1}`} />
            ))}
         </IconWrapper>
      </Container>
   );
};

export default SplashPage;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100vh;
   background-color: #ff005c;
   color: white;
   text-align: center;
`;

const Logo = styled.h1`
   font-size: 5rem;
   font-family: Bold;
`;

const Tagline = styled.p`
   font-size: 1.3rem;
   font-family: Regular;
   margin-bottom: 100px;
`;
const checkIconAnimation = keyframes`
   0%, 33.33% {
      opacity: 1;
   }
   33.34%, 100% {
      opacity: 0;
   }
`;

const searchIconAnimation = keyframes`
   0%, 33.33% {
      opacity: 0;
   }
   33.34%, 66.66% {
      opacity: 1;
   }
   66.67%, 100% {
      opacity: 0;
   }
`;

const basketIconAnimation = keyframes`
   0%, 66.66% {
      opacity: 0;
   }
   66.67%, 100% {
      opacity: 1;
   }
`;

const Icon = styled.img`
   position: absolute;
   top: 0;
   left: 0;
   width: 5rem;
   color: white;

   &:nth-child(1) {
      animation: ${checkIconAnimation} 4s infinite;
   }

   &:nth-child(2) {
      animation: ${searchIconAnimation} 4s infinite;
   }

   &:nth-child(3) {
      animation: ${basketIconAnimation} 4s infinite;
   }
`;

const IconWrapper = styled.div`
   position: relative;
   width: 5rem; /* 아이콘 크기에 맞게 조정 */
   height: 5rem; /* 아이콘 크기에 맞게 조정 */
`;
