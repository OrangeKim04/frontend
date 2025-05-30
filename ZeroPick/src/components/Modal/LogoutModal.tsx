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
};

const LogoutModal = ({ onClose }: ModalProps) => {
   const navigate = useNavigate();
   const logout = async () => {
      try {
         const result = await customFetch(
            '/user/logout',
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
            },
            navigate,
         );
         console.log('로그아웃 성공:', result);
         navigate('/login');
      } catch (error) {
         console.error('로그아웃 오류:', error);
         alert('로그아웃에 실패했어요.');
      }
   };

   const onSubmit = () => {
      logout();
   };
   return (
      <Overlay>
         <ModalBox>
            <Message>로그아웃 하시겠습니까?</Message>
            <ButtonRow>
               <ModalButton onClick={onSubmit}>확인</ModalButton>
               <ModalButtonCancel onClick={onClose}>취소</ModalButtonCancel>
            </ButtonRow>
         </ModalBox>
      </Overlay>
   );
};

export default LogoutModal;
