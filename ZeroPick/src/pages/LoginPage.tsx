import {
   Box,
   Title,
   Form,
   InputBox,
   Input,
   Button,
   TextBox,
   SubText,
   SubLink,
} from '@/components/styles/common';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
const LoginPage = () => {
   const navigate = useNavigate();

   const schema = yup.object().shape({
      email: yup
         .string()
         .email('올바른 이메일 형식이 아닙니다. 다시 한번 확인해주세요!')
         .required('이메일을 반드시 입력해주세요.'),
      password: yup
         .string()
         // required를 min보다 앞에 위치시켜 필수 필드 검증이 가장 먼저 실행되도록 수정
         .required('비밀번호를 반드시 입력해주세요.')
         .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
         .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
   });
   // handleSubmit은 useForm에서 제공해준다.
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      // 폼 제출 시 yup의 검증규칙 적용
      resolver: yupResolver(schema), // resolver: 외부 라이브러리와 통합하기 위한 옵션
   });

   // 폼 제출 시 서버로 POST 요청 보내는 함수
   const onSubmit = async data => {
      console.log('onSubmit 실행됨', data); // 여기서 데이터를 확인

      try {
         const response = await fetch('https://zeropick.p-e.kr/user/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error('로그인 실패');
         }

         const result = await response.json(); // 서버 응답 데이터
         console.log('로그인 성공:', result); // 로그인 성공 시 출력
         // 로그인 성공 후, 예를 들어 홈 화면으로 이동:

         navigate('/home');
      } catch (error) {
         console.error('로그인 오류:', error);
      }
   };
   return (
      <Box>
         <Title>로그인</Title>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
               <Input placeholder="이메일" {...register('email')} />
               <ErrorTxt>{errors.email?.message}</ErrorTxt>
               <Input placeholder="비밀번호" {...register('password')} />
               <ErrorTxt>{errors.password?.message}</ErrorTxt>
            </InputBox>
            <Button type={'submit'}>로그인</Button>
         </Form>
         <TextBox>
            <SubText>회원이 아니신가요? </SubText>
            <SubLink to="/signup">회원가입</SubLink>
         </TextBox>
      </Box>
   );
};
export default LoginPage;
const ErrorTxt = styled.p`
   color: red;
   font-size: 10px;
   margin-top: 0;
   margin-bottom: 5px;
`;
