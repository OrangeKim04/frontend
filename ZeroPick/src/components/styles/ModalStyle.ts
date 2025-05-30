import styled from 'styled-components';
export const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100dvh;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
`;

export const ModalBox = styled.div`
   background: white;
   padding: 30px 30px;
   border-radius: 10px;
   text-align: center;
   max-width: 300px;
`;

export const Message = styled.p`
   font-size: 1rem;
   margin-bottom: 20px;
   margin-top: 0;
   font-family: Medium;
`;

export const ButtonRow = styled.div`
   display: flex;
   justify-content: center;
   gap: 10px;
`;

export const ModalButton = styled.button`
   padding: 8px 16px;
   font-size: 1rem;
   border: none;
   background: #ff9eb3;
   color: white;
   border-radius: 5px;
   cursor: pointer;
   font-family: Regular;
`;

export const ModalButtonCancel = styled(ModalButton)`
   background: #6c757d;
   font-family: Regular;
`;
