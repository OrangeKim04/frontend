import styled, { keyframes } from 'styled-components';
import checkIcon from '@/assets/splash/Check.svg';
import searchIcon from '@/assets/splash/Search.svg';
import basketIcon from '@/assets/splash/Basket.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '@/assets/splash/background.svg';
const SplashPage = () => {
   const icons = [checkIcon, searchIcon, basketIcon];
   const navigate = useNavigate();
   useEffect(() => {
      const timer = setTimeout(() => {
         navigate('/login'); // 일정 시간 후 랜딩 페이지로 이동
      }, 3900); // 3.9초 후 이동

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
   }, [navigate]);
   return (
      <Container>
         <Logo>제로픽</Logo>
         <Tagline>영양성분부터 대체당까지 분석해요</Tagline>
         <IconWrapper>
            {icons.map((icon, index) => (
               <Icon key={index} src={icon} />
            ))}
         </IconWrapper>
      </Container>
   );
};

export default SplashPage;

const Container = styled.div`
   position: relative;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100dvh;
   background-color: #ff9eb3;
   color: white;
   text-align: center;
   z-index: 0;
   background-image: url(${backgroundImg});
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center;

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(40px);
      -webkit-backdrop-filter: blur(20px);
      z-index: -1;
   }
`;

const Logo = styled.h1`
   font-size: 5rem;
   font-family: Bold;
   margin-bottom: 15px;
   color: white;
   font-family: HakgyoansimPuzzleTTF-Black;
      /* text-shadow:
      0 0 10px rgba(255, 255, 255, 0.2),
      0 0 20px rgba(255, 255, 255, 0.15),
      0 0 30px rgba(255, 255, 255, 0.1); /* 빛번짐 효과 */ * /;
`;

const Tagline = styled.p`
   font-size: 1.3rem;
   font-family: Regular;
   margin-bottom: 80px;
   color: white;
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
   /* 빛번짐 효과 */
   filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))
      drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))
      drop-shadow(0 0 15px rgba(255, 255, 255, 0.1));

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
