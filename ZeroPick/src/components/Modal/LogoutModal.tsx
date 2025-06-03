import {
   ModalBox,
   Message,
   ButtonRow,
   ModalButton,
   ModalButtonCancel,
} from '../styles/ModalStyle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '@/hooks/CustomFetch';
import { AnimatedModalWrapper } from './AnimatedModalWrapper';
type ModalProps = {
   onClose: () => void;
};

const LogoutModal = ({ onClose }: ModalProps) => {
   const navigate = useNavigate();
   const [isVisible, setIsVisible] = useState(true);
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
      <AnimatedModalWrapper isVisible={isVisible} onClose={onClose}>
         <ModalBox>
            <Message>로그아웃 하시겠습니까?</Message>
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

export default LogoutModal;
