import styled from 'styled-components';
import { AnimatedModalWrapper } from './AnimatedModalWrapper';
import { useState } from 'react';
export const ErrorModal = ({
   message,
   onClose,
}: {
   message: string;
   onClose: () => void;
}) => {
   const [isVisible, setIsVisible] = useState(true);

   const handleClose = () => {
      setIsVisible(false);
      setTimeout(onClose, 200); // 애니메이션 시간 후 종료
   };
   return (
      <AnimatedModalWrapper isVisible={isVisible} onClose={onClose}>
         <ModalBox>
            <ModalMessage>{message}</ModalMessage>
            <ModalButton onClick={handleClose}>확인</ModalButton>
         </ModalBox>
      </AnimatedModalWrapper>
   );
};

const ModalBox = styled.div`
   background: #fff;
   padding: 2rem 1.5rem 1.2rem 1.5rem;
   border-radius: 12px;
   box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
   min-width: 260px;
   text-align: center;
`;
const ModalMessage = styled.div`
   font-size: 1.05rem;
   color: #ff4d4f;
   margin-bottom: 1.2rem;
   font-weight: bold;
`;
const ModalButton = styled.button`
   background: #ff9eb3;
   color: #fff;
   border: none;
   border-radius: 6px;
   padding: 0.5rem 1.2rem;
   font-size: 1rem;
   cursor: pointer;
`;
