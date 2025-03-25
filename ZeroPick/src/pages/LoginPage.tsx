import {
   Container,
   Box,
   Text,
   Form,
   InputBox,
   Input,
   Button,
   TextBox,
   SubText,
   SubLink,
} from '@/components/styles/common';
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
            <TextBox>
               <SubText>회원이 아니신가요? </SubText>
               <SubLink to="">회원가입</SubLink>
            </TextBox>
         </Box>
      </Container>
   );
};
export default LoginPage;
