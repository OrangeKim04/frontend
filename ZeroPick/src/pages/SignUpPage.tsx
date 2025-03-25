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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
const SignUpPage = () => {
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
      passwordCheck: yup
         .string()
         .required('비밀번호 검증 또한 필수 입력요소 입니다.')
         .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.') // password와 일치하는지 확인
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
   return (
      <Container>
         <Box>
            <Text>회원가입</Text>
            <Form>
               <InputBox>
                  <Input type={'email'} placeholder="이메일" {...register('email')} />
                  <Input placeholder="아이디" />
                  <Input type={'password'} placeholder="비밀번호" {...register('password')} />
                  <Input type={'password'} placeholder="비밀번호를 다시 입력해주세요" {...register('passwordCheck')} />
               </InputBox>
               <Button type={'submit'}>가입하기</Button>
            </Form>
            <TextBox>
               <SubText>이미 회원이신가요?</SubText>
               <SubLink to="">로그인</SubLink>
            </TextBox>
         </Box>
      </Container>
   );
};
export default SignUpPage;
