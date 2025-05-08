import styled from 'styled-components';
import backIcon from '@/assets/Left Arrow.svg';
import { useNavigate } from 'react-router-dom';
interface BackArrowProps {
   url: string | number;
}
const BackArrow = ({ url }: BackArrowProps) => {
   const navigate = useNavigate();
   const handleNavigate = () => {
      if (typeof url === 'number') {
         navigate(url);
      } else {
         navigate(url);
      }
   };

   return (
      <>
         <BackIcon src={backIcon} onClick={handleNavigate} />
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
