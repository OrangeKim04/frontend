import { useLocation } from 'react-router-dom';
const ProductDetailPage = () => {
   const location = useLocation();
   const item = location.state;
   return (
      <>
         <p>상세</p>
         <p>상품: {item.name}</p>
      </>
   );
};
export default ProductDetailPage;
