import styled from 'styled-components';
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
