import {
   ModalBox,
   Message,
   ButtonRow,
   ModalButton,
   ModalButtonCancel,
} from '../styles/ModalStyle';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '@/hooks/CustomFetch';
import { useState } from 'react';
import { AnimatedModalWrapper } from './AnimatedModalWrapper';

type ModalProps = {
   onClose: () => void;
   id: number;
};

const ProductDeleteModal = ({ onClose, id }: ModalProps) => {
   const navigate = useNavigate();
   const [isVisible, setIsVisible] = useState(true);
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
         setIsVisible(false);
         setTimeout(() => window.location.reload(), 300);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };

   return (
      <AnimatedModalWrapper isVisible={isVisible} onClose={onClose}>
         <ModalBox>
            <Message>상품을 정말 삭제하시겠습니까?</Message>
            <ButtonRow>
               <ModalButton onClick={handleUnScrap}>확인</ModalButton>
               <ModalButtonCancel onClick={() => setIsVisible(false)}>
                  취소
               </ModalButtonCancel>
            </ButtonRow>
         </ModalBox>
      </AnimatedModalWrapper>
   );
};

export default ProductDeleteModal;
