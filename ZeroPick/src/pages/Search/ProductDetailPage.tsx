import { useLocation, useNavigate } from 'react-router-dom';
import BackArrow from '@/components/BackArrow';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NutrientTable from '@/components/NutrientTable';
import { customFetch } from '@/hooks/CustomFetch';
import {
   createNutrientTableData,
   ExtendedNutrientData,
   Substitute,
} from '@/type/nutritientData';
import RingLoading from '@/components/RingLoader';
import FoodImg from '@/components/FoodImg';
import Scrap from '@/components/Scrapped';
import SugarComponents from '@/components/SugarComponents';

const ProductDetailPage = () => {
   const { state } = useLocation();
   const navigate = useNavigate();
   const [data, setData] = useState<ExtendedNutrientData | null>();
   const [sugar, setSugar] = useState<Substitute[]>([]);

   const tableData = data ? createNutrientTableData(data) : [];
   useEffect(() => {
      fetchData();
      fetchSugarByID(state);

      if (data) console.log(data);
   }, [state]);

   //ID 기반 식품 상세 조회
   const fetchData = async () => {
      try {
         const result = await customFetch(
            `/foods/${state}`,
            {
               method: 'GET',
               headers: { accept: 'application/json' },
            },
            navigate,
         );
         console.log('식품 상세 조회 성공', result);
         setData(result);
      } catch (error) {
         console.error('식품 상세 조회 실패', error);
      }
   };
   // ID기반 대체당 목록 조회
   const fetchSugarByID = async (id: string) => {
      try {
         const result = await customFetch(
            `/foods/${id}/sweeteners`,
            {
               method: 'GET',
               headers: { accept: 'application/json' },
            },
            navigate,
         );
         console.log(id, 'ID기반 대체당 목록 조회', result);
         setSugar(result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };

   if (!data) return <RingLoading />;

   return (
      <Container>
         <BackArrow url={-1} />

         <Title> {data.foodNmKr}</Title>
         <Scrap foodId={data.id} />
         <FoodImg foodNm={data.foodNmKr} />
         {data.itemReportNo && (
            <Item>
               품목제조보고번호:{'\u00A0'}
               {'\u00A0'}
               {data.itemReportNo}
            </Item>
         )}

         <NutrientTable data={tableData} />

         <SugarComponents sugar={sugar} />
      </Container>
   );
};
export default ProductDetailPage;

const Container = styled.div`
   gap: 16px;
   overflow-y: auto;
   padding: 20px;
   position: relative;
   padding-bottom: 100px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;
const Title = styled.p`
   width: 70%;
   font-size: 1.4rem;
   margin-bottom: 20px;
   font-family: Bold;
   text-align: center;
   margin-top: 0;
`;

const Item = styled.div`
width: 100%;
font-size: 0.95rem;
font-family:  Regular
padding: 8px;
border-radius: 6px;
 word-wrap: break-word;
`;
