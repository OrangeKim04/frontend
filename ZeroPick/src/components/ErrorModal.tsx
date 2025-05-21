import styled from 'styled-components';

export const ErrorModal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <ModalOverlay>
    <ModalBox>
      <ModalMessage>{message}</ModalMessage>
      <ModalButton onClick={onClose}>확인</ModalButton>
    </ModalBox>
  </ModalOverlay>
);

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const ModalBox = styled.div`
  background: #fff;
  padding: 2rem 1.5rem 1.2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  min-width: 260px;
  text-align: center;
`;
const ModalMessage = styled.div`
  font-size: 1.05rem;
  color: #ff4d4f;
  margin-bottom: 1.2rem;
  font-weight: bold;
`;
const ModalButton = styled.button`
  background: #ff9eb3;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
`;
