import styled from 'styled-components';
import { Link } from 'react-router-dom';
const LoginPage = () => {
   return (
      <Container>
         <Box>
            <Text>로그인</Text>
            <Form>
               <InputBox>
                  <Input placeholder="아이디" />
                  <Input placeholder="비밀번호" />
               </InputBox>
               <Button>로그인</Button>
            </Form>
            <SubText to="">회원가입</SubText>
         </Box>
      </Container>
   );
};
export default LoginPage;
const Input = styled.input`
   width: 80%;
   height: 3.2rem;
   border-color: #ff005c;
   border-radius: 10px;
   box-sizing: border-box;
   padding-left: 15px;
   outline: none;
`;
const Container = styled.div``;
const InputBox = styled.div`
   display: flex;
   width: 100%;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`;
const Text = styled.p`
   font-family: Bold;
   font-size: 2rem;
`;
const Button = styled.button`
   width: 80%;
   background-color: #ff005c;
   height: 3.2rem;
   border: none;
   border-radius: 10px;
   color: white;
   font-size: 1.2rem;
   font-family: SemiBold;
`;
const Form = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 40px;
   width: 100%;
   margin-top: 20px;
`;
const SubText = styled(Link)`
   font-family: Regular;
   margin-top: 15px;
`;
const Box = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   position: absolute;
   bottom: 200px;
`;
