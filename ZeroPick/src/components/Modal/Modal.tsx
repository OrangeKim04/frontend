import {
   ModalBox,
   Overlay,
   Message,
   ButtonRow,
   ModalButton,
   ModalButtonCancel,
} from '../styles/ModalStyle';
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
