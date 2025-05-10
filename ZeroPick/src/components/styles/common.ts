import styled from 'styled-components';
import { Link } from 'react-router-dom';
// 회원가입, 로그인 페이지에 쓰이는 스타일 컴포넌트
// 기본 페이지(홈,레시피, 설정)에 사용되는 Container, WhiteBox
export const Input = styled.input`
   width: 100%;
   height: 3.2rem;
   border-color: #ff9eb3;
   border-radius: 20px;
   box-sizing: border-box;
   padding-left: 15px;
   outline: none;
   font-size: 0.9rem;
`;
export const InputBox = styled.div`
   display: flex;
   width: 100%;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`;
export const Title = styled.p`
   font-family: Bold;
   font-size: 2rem;
`;
export const Button = styled.button`
   width: 100%;
   background-color: #ff9eb3;
   height: 3.2rem;
   border: none;
   border-radius: 20px;
   color: white;
   font-size: 1.1rem;
   font-family: SemiBold;
   cursor: pointer;
   flex-shrink: 0;
`;
export const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 40px;
   width: 100%;
   margin-top: 20px;
`;
export const SubLink = styled(Link)`
   font-family: Regular;
   font-size: 0.9rem;
`;
export const SubText = styled.p`
   font-family: Regular;
   margin-top: 15px;
   margin: 0;
   font-size: 0.9rem;
`;
export const Box = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   position: absolute;
   top: 30px;
   padding: 0 30px;
   box-sizing: border-box;
`;
export const TextBox = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   margin-top: 20px;
`;

export const Container = styled.div`
   background-color: #f4f4f4;
   width: 100%;
   height: calc(100vh - 70px); /* 화면 높이에서 70px을 뺀 높이 */
   padding: 15px;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 12px;
   overflow-y: auto; /* 세로 스크롤 활성화 */
`;
export const WhiteBox = styled.div`
   background-color: white;
   width: 100%;
   border-radius: 20px;
   padding: 20px;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   gap: 15px;
   box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
`;
