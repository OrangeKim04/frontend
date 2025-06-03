import {
   ModalBox,
   Message,
   ButtonRow,
   ModalButton,
   ModalButtonCancel,
} from '../styles/ModalStyle';
import FoodImg from '../FoodImg';
import { AnimatedModalWrapper } from './AnimatedModalWrapper';
import { useState } from 'react';
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
   const [isVisible, setIsVisible] = useState(true);
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
      <AnimatedModalWrapper isVisible={isVisible} onClose={onClose}>
         <ModalBox>
            <FoodImg foodNm={foodNmKr!} />
            {makerNm && makerNm.trim() !== 'null' && (
               <Message>{makerNm}</Message>
            )}
            <Message>
               <span style={{ color: 'blue' }}>{foodNmKr}</span> 맞나요?
            </Message>
            <ButtonRow>
               <ModalButton onClick={onSubmit}>확인</ModalButton>
               <ModalButtonCancel onClick={() => setIsVisible(false)}>
                  취소
               </ModalButtonCancel>
            </ButtonRow>
         </ModalBox>
      </AnimatedModalWrapper>
   );
};

export default Modal;
