import styled from 'styled-components';
import { RingLoader } from 'react-spinners';
const RingLoading = () => {
   return (
      <LoadingContainer>
         <RingLoader color={'#FF9EB3'} />
      </LoadingContainer>
   );
};

export default RingLoading;

const LoadingContainer = styled.div`
   width: 100%;
   height: 100dvh;
   display: flex;
   justify-content: center;
   align-items: center;
`;
