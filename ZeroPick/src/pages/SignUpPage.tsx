import {
   Box,
   Title,
   Form,
   InputBox,
   Input,
   Button,
} from '@/components/styles/common';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import icon from '@/assets/Left Arrow.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { customFetch } from '@/hooks/CustomFetch';
interface FormData {
   email: string;
   password: string;
   passwordCheck: string;
}

const SignUpPage = () => {
   const navigate = useNavigate();

   const schema = yup.object().shape({
      username: yup.string().required('닉네임을 반드시 입력해주세요.'),
      email: yup
         .string()
         .email('올바른 이메일 형식이 아닙니다. 다시 한번 확인해주세요!')
         .required('이메일을 반드시 입력해주세요.'),
      password: yup
         .string()
         .required('비밀번호를 반드시 입력해주세요.')
         .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
         .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
      passwordCheck: yup
         .string()
         .required('비밀번호 검증 또한 필수 입력요소 입니다.')
         .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
         .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
         .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
   });

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   });

   // 폼 제출 시 서버로 POST 요청 보내는 함수

   const onSubmit = async ({ passwordCheck, ...dataToSend }: FormData) => {
      console.log('onSubmit 실행됨', dataToSend);
      console.log(passwordCheck);

      try {
         const result = await customFetch(
            '/auth/join',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(dataToSend),
            },
            navigate,
         );
         console.log(result);
         alert('회원가입 성공');

         navigate('/login');
      } catch (error) {
         console.error('회원가입 오류:', error);
         alert('회원가입에 실패했어요');
      }
   };

   return (
      <Box>
         <Img src={icon} onClick={() => navigate('/login')} />
         <Title>회원가입</Title>
         {/* noValidate 제거하여 디버깅 */}
         <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
               <Input placeholder="닉네임" {...register('username')} />
               <ErrorTxt>{errors.username?.message}</ErrorTxt>
               <Input
                  type={'email'}
                  placeholder="이메일"
                  {...register('email')}
               />
               <ErrorTxt>{errors.email?.message}</ErrorTxt>

               <Input
                  type={'password'}
                  placeholder="비밀번호"
                  {...register('password')}
               />
               <ErrorTxt>{errors.password?.message}</ErrorTxt>
               <Input
                  type={'password'}
                  placeholder="비밀번호를 다시 입력해주세요"
                  {...register('passwordCheck')}
               />
               <ErrorTxt>{errors.passwordCheck?.message}</ErrorTxt>
            </InputBox>
            <Button type={'submit'}>가입하기</Button>
         </Form>
      </Box>
   );
};

export default SignUpPage;

const Img = styled.img`
   position: absolute;
   left: 30px;
   cursor: pointer;
`;

const ErrorTxt = styled.p`
   color: red;
   font-size: 10px;
   margin-top: 0;
   margin-bottom: 5px;
`;
