import styled from 'styled-components';
import Product from '@/components/Product';
import { Items } from '@/data/mockdata';

const LikedProduct = () => {
  return (
    <>
      <Title>상품 좋아요 목록</Title>
      <ItemList>
        {Items.map((item, id) => (
          <Product key={id} item={{ id: item.id, foodNmKr: item.name }} />
        ))}
      </ItemList>
    </>
  );
};

export default LikedProduct;

// ---------- Styled Components ----------
const Title = styled.p`
  margin: 0;
  font-family: SemiBold;
  font-size: 1.4rem;
  text-align: center;
  margin: 20px 0;
`;

const ItemList = styled.div`
  width: 100%;
  height: calc(100vh - 136px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 20px;
  box-sizing: border-box;
`;
