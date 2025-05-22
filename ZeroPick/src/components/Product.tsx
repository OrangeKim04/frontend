import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 🔹 단일 제품 아이템의 타입
export type ProductItem = {
  foodNmKr: string;
  foodId: number;
};

// 🔹 props 타입 정의
type ProductProps = {
  item: ProductItem;
};

const Product = ({ item }: ProductProps) => {
  const navigate = useNavigate();

  return (
    <Item onClick={() => navigate(`/${item.foodId}`, { state: item.foodId })}>
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
  flex-shrink: 0;
`;

export default Product;
