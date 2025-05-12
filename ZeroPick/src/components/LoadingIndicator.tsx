// components/LoadingIndicator.tsx
import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

interface LoadingIndicatorProps {
   isFetching: boolean;
}

const LoadingContainer = styled.div`
   width: 100%;
   min-height: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const LoadingIndicator = React.forwardRef<
   HTMLDivElement,
   LoadingIndicatorProps
>(({ isFetching }, ref) => (
   <LoadingContainer ref={ref}>
      {isFetching && <ClipLoader color={'#FF9EB3'} />}
   </LoadingContainer>
));

export default LoadingIndicator;
