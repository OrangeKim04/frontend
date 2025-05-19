import {
   ModalBox,
   Overlay,
   Message,
   ButtonRow,
   ModalButton,
   ModalButtonCancel,
} from '../styles/ModalStyle';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '@/hooks/CustomFetch';
type ModalProps = {
   onClose: () => void;
   id: number;
};

const ProductDeleteModal = ({ onClose, id }: ModalProps) => {
   const navigate = useNavigate();
   const handleUnScrap = async () => {
      try {
         const result = await customFetch(
            `/ocr/${id}`,
            {
               method: 'DELETE',
               headers: { 'Content-Type': 'application/json' },
            },
            navigate,
         );
         console.log('스크랩 취소 성공', result);
         onClose();
         window.location.reload();
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   const onSubmit = () => {
      handleUnScrap();
   };
   return (
      <Overlay>
         <ModalBox>
            <Message>상품을 정말 삭제하시겠습니까?</Message>
            <ButtonRow>
               <ModalButton onClick={onSubmit}>확인</ModalButton>
               <ModalButtonCancel onClick={onClose}>취소</ModalButtonCancel>
            </ButtonRow>
         </ModalBox>
      </Overlay>
   );
};

export default ProductDeleteModal;
