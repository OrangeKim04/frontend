import { Box, Title, Form, InputBox, Input, Button, TextBox, SubText, SubLink } from '@/components/styles/common';
const LoginPage = () => {
   return (
      <Box>
         <Title>로그인</Title>
         <Form>
            <InputBox>
               <Input placeholder="아이디" />
               <Input placeholder="비밀번호" />
            </InputBox>
            <Button>로그인</Button>
         </Form>
         <TextBox>
            <SubText>회원이 아니신가요? </SubText>
            <SubLink to="/signup">회원가입</SubLink>
         </TextBox>
      </Box>
   );
};
export default LoginPage;
