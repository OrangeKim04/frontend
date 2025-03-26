import styled from 'styled-components';
import { reports } from '@/data/mockdata';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/styles/common';
import checkIcon from '@/assets/checkG.svg';
import bellIcon from '@/assets/Bell.svg';
import { Container, WhiteBox } from '@/components/styles/common';
const HomePage = () => {
   const navigate = useNavigate();
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
            <Title>제로제품 건강하게 선택하세요!</Title>
            <Button onClick={() => navigate('/camera')} style={{ fontSize: '1.1rem' }}>
               원재료 성분 확인하기
            </Button>
         </WhiteBox>
         <WhiteBox>
            <Title>관련 뉴스</Title>
            {reports.map((item, id) => (
               <News key={id} onClick={() => window.open(item.link)}>
                  {item.title}
               </News>
            ))}
            {reports.map((item, id) => (
               <News key={id} onClick={() => window.open(item.link)}>
                  {item.title}
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
