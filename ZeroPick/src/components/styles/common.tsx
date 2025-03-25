import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const Input = styled.input`
   width: 100%;
   height: 3.2rem;
   border-color: #ff9eb3;
   border-radius: 10px;
   box-sizing: border-box;
   padding-left: 15px;
   outline: none;
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
   border-radius: 10px;
   color: white;
   font-size: 1.1rem;
   font-family: SemiBold;
   cursor: pointer;
`;
export const Form = styled.div`
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
