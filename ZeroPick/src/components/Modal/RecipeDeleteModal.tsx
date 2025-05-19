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
   id: string;
};

const RecipeDeleteModal = ({ onClose, id }: ModalProps) => {
   const navigate = useNavigate();
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
      <Overlay>
         <ModalBox>
            <Message>레시피를 정말 삭제하시겠습니까?</Message>
            <ButtonRow>
               <ModalButton onClick={onSubmit}>확인</ModalButton>
               <ModalButtonCancel onClick={onClose}>취소</ModalButtonCancel>
            </ButtonRow>
         </ModalBox>
      </Overlay>
   );
};

export default RecipeDeleteModal;
