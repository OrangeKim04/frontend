import backIcon from '@/assets/Left Arrow.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const AnalysisPage = () => {
   const navigate = useNavigate();
   return (
      <>
         <BackIcon src={backIcon} onClick={() => navigate('/home')} />
         <Title>분석 결과</Title>
      </>
   );
};
export default AnalysisPage;
const BackIcon = styled.img`
   position: absolute;
   left: 20px;
   top: 22px;
   cursor: pointer;
`;
const Title = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.4rem;
   margin: 0;
   text-align: center;
   margin: 20px 0;
`;
