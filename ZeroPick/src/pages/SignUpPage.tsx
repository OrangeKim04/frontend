import { Box, Title, Form, InputBox, Input, Button } from '@/components/styles/common';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import icon from '@/assets/Left Arrow.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
   const navigate = useNavigate();
   const schema = yup.object().shape({
      nickname: yup
         .string()
         .email('올바른 닉네임 형식이 아닙니다. 다시 한번 확인해주세요!')
         .required('닉네임을 반드시 입력해주세요.'),
      email: yup
         .string()
         .email('올바른 이메일 형식이 아닙니다. 다시 한번 확인해주세요!')
         .required('이메일을 반드시 입력해주세요.'),
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
      passwordCheck: yup
         .string()
         .required('비밀번호 검증 또한 필수 입력요소 입니다.')
         .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.') // password와 일치하는지 확인
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
         <Img src={icon} onClick={() => navigate('/login')} />
         <Title>회원가입</Title>
         <Form>
            <InputBox>
               <Input placeholder="닉네임" {...register('nickname')} />
               <Input type={'email'} placeholder="이메일" {...register('email')} />
               <Input placeholder="아이디" />
               <Input type={'password'} placeholder="비밀번호" {...register('password')} />
               <Input type={'password'} placeholder="비밀번호를 다시 입력해주세요" {...register('passwordCheck')} />
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
