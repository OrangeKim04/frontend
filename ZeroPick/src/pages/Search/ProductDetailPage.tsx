import { useLocation } from 'react-router-dom';
import BackArrow from '@/components/BackArrow';
const ProductDetailPage = () => {
   const location = useLocation();
   const item = location.state;
   return (
      <>
         <BackArrow url={-1} />
         <p>상세</p>
         <p>상품: {item.name}</p>
      </>
   );
};
export default ProductDetailPage;
