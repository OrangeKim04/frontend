import {
   ModalBox,
   Message,
   ButtonRow,
   ModalButton,
   ModalButtonCancel,
} from '../styles/ModalStyle';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '@/hooks/CustomFetch';
import { AnimatedModalWrapper } from './AnimatedModalWrapper';
import { useState } from 'react';
type ModalProps = {
   onClose: () => void;
   id: string;
};

const RecipeDeleteModal = ({ onClose, id }: ModalProps) => {
   const navigate = useNavigate();
   const [isVisible, setIsVisible] = useState(true);
   const handleUnScrap = async () => {
      try {
         const result = await customFetch(
            `/recipes/${id}`,
            {
               method: 'DELETE',
               headers: {
                  accept: 'application/json',
               },
            },
            navigate,
         );
         console.log('스크랩 취소 성공', result);
         navigate(-1);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   const onSubmit = () => {
      handleUnScrap();
   };
   return (
      <AnimatedModalWrapper isVisible={isVisible} onClose={onClose}>
         <ModalBox>
            <Message>레시피를 정말 삭제하시겠습니까?</Message>
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

export default RecipeDeleteModal;
