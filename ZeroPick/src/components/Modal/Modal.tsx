import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
type ModalProps = {
   onClose: () => void;
   foodNmKr?: string;
   makerNm?: string | null;
   id?: string | null;
   itemReportNo?: string | null;
   ocrText?: string | null;
};

const Modal = ({
   onClose,
   foodNmKr,
   makerNm,
   id,
   itemReportNo,
   ocrText,
}: ModalProps) => {
   const navigate = useNavigate();
   const onSubmit = () => {
      if (id) {
         navigate('/home/result', {
            state: { id, itemReportNo, ocrText },
         });
      } else {
         navigate('/home/result', {
            state: { itemReportNo, ocrText },
         });
      }
   };
   return (
      <Overlay>
         <ModalBox>
            {makerNm && makerNm.trim() !== 'null' && (
               <Message>{makerNm}</Message>
            )}
            <Message>
               <span style={{ color: 'blue' }}>{foodNmKr}</span> 맞나요?
            </Message>
            <ButtonRow>
               <ModalButton onClick={onSubmit}>확인</ModalButton>
               <ModalButtonCancel onClick={onClose}>취소</ModalButtonCancel>
            </ButtonRow>
         </ModalBox>
      </Overlay>
   );
};

export default Modal;

const Overlay = styled.div`
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

const ModalBox = styled.div`
   background: white;
   padding: 30px 30px;
   border-radius: 10px;
   text-align: center;
   max-width: 300px;
`;

const Message = styled.p`
   font-size: 1rem;
   margin-bottom: 20px;
   margin-top: 0;
   font-family: Medium;
`;

const ButtonRow = styled.div`
   display: flex;
   justify-content: center;
   gap: 10px;
`;

const ModalButton = styled.button`
   padding: 8px 16px;
   font-size: 1rem;
   border: none;
   background: #ff9eb3;
   color: white;
   border-radius: 5px;
   cursor: pointer;
   font-family: Regular;
`;

const ModalButtonCancel = styled(ModalButton)`
   background: #6c757d;
   font-family: Regular;
`;
