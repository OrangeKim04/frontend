import { useParams } from 'react-router-dom';
const ProductDetailPage = () => {
   const { id } = useParams(); // URL의 id를 가져옴
   return (
      <>
         <p>상세</p>
         <p>현재 ID: {id}</p>
      </>
   );
};
export default ProductDetailPage;
