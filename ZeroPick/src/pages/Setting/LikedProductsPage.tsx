import styled from 'styled-components';
import Product from '@/components/Product';
import { Items } from '@/data/mockdata';
const LikedProduct = () => {
   return (
      <>
         <Title>상품 좋아요 목록</Title>
         <ItemList>
            {Items.map((item, id) => (
               <Product key={id} item={item} />
            ))}
         </ItemList>
      </>
   );
};
export default LikedProduct;
const Title = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.4rem;
   margin: 0;
   text-align: center;
   margin: 20px 0;
`;
const ItemList = styled.div`
   width: 100%;
   height: calc(100vh - 136px);
   display: flex;
   flex-direction: column;
   overflow-y: auto; /* 세로 스크롤 활성화 */
   padding: 0 20px;
   box-sizing: border-box;
`;
