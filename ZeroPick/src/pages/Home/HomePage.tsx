import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/styles/common';
import checkIcon from '@/assets/home/Circled Check.svg';
import bellIcon from '@/assets/home/Bell.svg';
import { Container, WhiteBox } from '@/components/styles/common';
import { useEffect, useState, useRef } from 'react';
import CameraIcon from '@/assets/home/img.svg';

import { customFetch } from '@/hooks/CustomFetch';

type NewsItem = {
   title: string;
   link: string;
};
const HomePage = () => {
   const navigate = useNavigate();
   const inputRef = useRef<HTMLInputElement>(null);


   const [data, setData] = useState<NewsItem[]>([]); // 뉴스 데이터를 저장할 상태
   useEffect(() => {
      fetchData();
   }, []);
   const fetchData = async () => {
      try {

         const result = await customFetch('/news', { method: 'GET' }, navigate);
         console.log('뉴스 조회:', result);
         setData(result || []);
      } catch (error) {
         console.error('뉴스 조회:', error);
      }
   };


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
            <Button onClick={handleClick} style={{ fontSize: '1.1rem' }}>
               원재료 성분 확인하기
            </Button>
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
