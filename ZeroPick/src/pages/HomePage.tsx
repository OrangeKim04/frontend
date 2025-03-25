import styled from 'styled-components';
import { reports } from '@/data/mockdata';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/styles/common';
import checkIcon from '@/assets/checkG.svg';
import bellIcon from '@/assets/Bell.svg';
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
         <Box>
            <Title>제로제품 건강하게 선택하세요!</Title>
            <Button onClick={() => navigate('/camera')} style={{ fontSize: '1.1rem' }}>
               원재료 성분 확인하기
            </Button>
         </Box>
         <Box>
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
         </Box>
      </Container>
   );
};
export default HomePage;
const Container = styled.div`
   background-color: #ededed;
   width: 100%;
   height: calc(100vh - 70px); /* 화면 높이에서 80px을 뺀 높이 */
   padding: 10px;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
   overflow-y: auto; /* 세로 스크롤 활성화 */
`;
const Box = styled.div`
   background-color: white;
   width: 100%;
   border-radius: 20px;
   padding: 30px;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   gap: 20px;
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
`;
const Icon = styled.img`
   color: gray;
`;
