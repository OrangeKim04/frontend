import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
type ProductProps = {
   item: { foodNmKr: string; id: number };
};
const Product = ({ item }: ProductProps) => {
   const navigate = useNavigate();
   return (
      <Item onClick={() => navigate(`/${item.id}`, { state: item.id })}>
         <ItemText>{item.foodNmKr}</ItemText>
         <ItemText>&gt;</ItemText>
      </Item>
   );
};
const ItemText = styled.p`
   font-family: SemiBold;
   margin: 0;
`;
const Item = styled.div`
   width: 100%;
   height: 70px;
   border-bottom: 0.5px solid #e1e1e1;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 20px;
   box-sizing: border-box;
   cursor: pointer;
   flex-shrink: 0; /* 줄어들지 않도록 설정 */
`;
export default Product;
