import { Box, Title, Form, InputBox, Input, Button, TextBox, SubText, SubLink } from '@/components/styles/common';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
const LoginPage = () => {
   const navigate = useNavigate();
   const schema = yup.object().shape({
      id: yup
         .string()
         // required를 min보다 앞에 위치시켜 필수 필드 검증이 가장 먼저 실행되도록 수정
         .required('아이디를 반드시 입력해주세요.')
         .min(8, '아이디는 8~16자 사이로 입력해주세요!')
         .max(16, '아이디는 8~16자 사이로 입력해주세요!'),
      password: yup
         .string()
         // required를 min보다 앞에 위치시켜 필수 필드 검증이 가장 먼저 실행되도록 수정
         .required('비밀번호를 반드시 입력해주세요.')
         .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
         .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
   });
   // handleSubmit은 useForm에서 제공해준다.
   const { register } = useForm({
      // 폼 제출 시 yup의 검증규칙 적용
      resolver: yupResolver(schema), // resolver: 외부 라이브러리와 통합하기 위한 옵션
   });
   return (
      <Box>
         <Title>로그인</Title>
         <Form>
            <InputBox>
               <Input placeholder="아이디" {...register('id')} />
               <Input placeholder="비밀번호" {...register('password')} />
            </InputBox>
            <Button onClick={() => navigate('/home')}>로그인</Button>
         </Form>
         <TextBox>
            <SubText>회원이 아니신가요? </SubText>
            <SubLink to="/signup">회원가입</SubLink>
         </TextBox>
      </Box>
   );
};
export default LoginPage;
