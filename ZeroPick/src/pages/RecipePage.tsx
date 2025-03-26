import { Container, Button, WhiteBox } from '@/components/styles/common';
import styled from 'styled-components';
const RecipePage = () => {
   return (
      <Container style={{ padding: '20px' }}>
         <Title>✏️ 냉장고에 있는 재료로 건강한 레시피를 생성해 보세요!</Title>
         <TextArea placeholder="ex) 계란 1개, 고구마 3개, 가지 2개, 오이 1개" />
         <Button>레시피 생성하기</Button>
      </Container>
   );
};
export default RecipePage;
const TextArea = styled.textarea`
   width: 100%;
   height: 90%;
   background-color: white;
   border: none;
   border-radius: 20px;
   outline: none;
   font-size: 0.9rem;
   fontfamily: Regular;
   padding: 20px;
   box-sizing: border-box;
   resize: none;
`;
const Title = styled.p`
   font-family: Bold;
   font-size: 1.5rem;
   margin: 0;
   width: 100%;
   padding: 0 5px;
   box-sizing: border-box;
`;
