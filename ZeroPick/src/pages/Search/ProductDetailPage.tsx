import { useLocation } from 'react-router-dom';
import BackArrow from '@/components/BackArrow';
import styled from 'styled-components';
import { Nuturitions } from '@/data/mockdata';

const Container = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 16px;
   overflow-y: auto;
   padding-bottom: 150px;
`;

const Card = styled.div`
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
   padding: 16px;
   text-align: center;
`;

const Label = styled.div`
   font-size: 14px;
   color: #666;
`;

const Value = styled.div`
   font-size: 18px;
   font-weight: 600;
   margin-top: 8px;
`;

const labels: Record<string, string> = {
   foodNmKr: '음식명',
   itemReportNo: '품목신고번호',
   energy: '열량 (kcal)',
   protein: '단백질 (g)',
   fat: '지방 (g)',
   carbohydrate: '탄수화물 (g)',
   sugars: '당류 (g)',
   sodium: '나트륨 (mg)',
   cholesterol: '콜레스테롤 (mg)',
   saturatedFat: '포화지방 (g)',
   transFat: '트랜스지방 (g)',
   galactose: '갈락토스 (g)',
   fructose: '과당 (g)',
   sugarAlcohol: '당알코올 (g)',
   maltose: '맥아당 (g)',
   allulose: '알룰로스 (g)',
   erythritol: '에리트리톨 (g)',
   lactose: '유당 (g)',
   sucrose: '자당 (g)',
   glucose: '포도당 (g)',
   totalWeight: '총중량 (g)',
   servingSize: '1회 제공량 (g)',
};
const ProductDetailPage = () => {
   const location = useLocation();
   const item = location.state;
   return (
      <Container>
         <BackArrow url={-1} />
         <p>상세</p>
         <p>상품: {item.name}</p>
         {Object.entries(Nuturitions).map(([key, value]) => (
            <Card key={key}>
               <Label>{labels[key]}</Label>
               <Value>{value}</Value>
            </Card>
         ))}
      </Container>
   );
};
export default ProductDetailPage;
