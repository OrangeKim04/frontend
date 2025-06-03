import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/styles/common';
import checkIcon from '@/assets/home/Circled Check.svg';
import bellIcon from '@/assets/home/Bell.svg';
import { Container, WhiteBox } from '@/components/styles/common';
import { useRef } from 'react';
import CameraIcon from '@/assets/home/img.svg';
import { useNews } from '@/hooks/useNews';
import { useEffect } from 'react';

const HomePage = () => {
   const navigate = useNavigate();
   const inputRef = useRef<HTMLInputElement>(null);
   const ref = useRef<HTMLDivElement>(null);
   const { data } = useNews();

   const handleClick = () => {
      inputRef.current?.click();
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const url = URL.createObjectURL(file);
         navigate('/camera', { state: { imageUrl: url } });
      }
   };
   useEffect(() => {
      let angle = 0;
      const tick = () => {
         angle = (angle + 1) % 360;
         if (ref.current) {
            ref.current.style.setProperty('--angle', `${angle}deg`);
         }
         requestAnimationFrame(tick);
      };
      tick();
   }, []);
   return (
      <Container>
         <Top>
            <Logo>
               <Icon src={checkIcon} />
               <Title style={{ color: '#808080', margin: '0' }}>제로픽</Title>
            </Logo>
            <Icon src={bellIcon} />
         </Top>
         <WhiteBox>
            <Title style={{ textAlign: 'center' }}>
               제로제품 건강하게 선택하세요!
            </Title>
            <CameraImg src={CameraIcon} />
            <ButtonWrapper ref={ref}>
               <Button onClick={handleClick} style={{ fontSize: '1.1rem' }}>
                  원재료명을 촬영해 보세요
               </Button>
            </ButtonWrapper>
            <input
               ref={inputRef}
               type="file"
               accept="image/*"
               style={{ display: 'none' }}
               onChange={handleFileChange}
            />
         </WhiteBox>
         <WhiteBox>
            <Title>관련 뉴스</Title>
            {data?.map((item, id) => (
               <News key={id} onClick={() => window.open(item.link)}>
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
               </News>
            ))}
         </WhiteBox>
      </Container>
   );
};
export default HomePage;

const ButtonWrapper = styled.div`
   width: 100%;
   min-height: 50px;
   padding: 2px;
   background: conic-gradient(
      from var(--angle, 0deg),
      red,
      yellow,
      lime,
      aqua,
      blue,
      magenta,
      red
   );
   border-radius: 20px;
   display: inline-block;
`;

const Top = styled.div`
   width: 100%;
   padding: 3px 7px;
   box-sizing: border-box;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;
const Logo = styled.div`
   box-sizing: border-box;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 5px;
`;
const Title = styled.p`
   font-family: SemiBold;
   font-size: 1.3rem;
   margin: 0;
   margin-bottom: 5px;
`;
const News = styled.p`
   font-family: Regular;
   margin: 0;
   cursor: pointer;
   text-decoration: underline;
   text-decoration-thickness: 0.5px; /* 언더라인 두께 조절 */
   text-underline-offset: 3px; /* 언더라인과 텍스트 간의 간격 */
   margin-bottom: 4px;
`;
const Icon = styled.img`
   color: gray;
`;
const CameraImg = styled.img`
   width: 150px;
   align-self: center;
`;
