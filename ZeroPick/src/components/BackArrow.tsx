import styled from 'styled-components';
import backIcon from '@/assets/Left Arrow.svg';
import { useNavigate } from 'react-router-dom';
const BackArrow = ({ url }) => {
   const navigate = useNavigate();
   return (
      <>
         <BackIcon src={backIcon} onClick={() => navigate(url)} />
      </>
   );
};
export default BackArrow;
const BackIcon = styled.img`
   position: absolute;
   left: 20px;
   top: 22px;
   cursor: pointer;
`;
