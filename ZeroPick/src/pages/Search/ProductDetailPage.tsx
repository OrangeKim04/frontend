import { useLocation } from 'react-router-dom';
import BackArrow from '@/components/BackArrow';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NutrientTable from '@/components/NutrientTable';
import { SugarBox } from '@/components/SugarBox';
import {
   createNutrientTableData,
   ExtendedNutrientData,
   Substitute,
} from '@/data/nutritientData';

const ProductDetailPage = () => {
   const { state } = useLocation();
   const [data, setData] = useState<ExtendedNutrientData | null>();
   const [sugar, setSugar] = useState<Substitute[]>([]);
   const tableData = data ? createNutrientTableData(data) : [];
   useEffect(() => {
      fetchData();
      fetchSugarByID(state);
      if (data) console.log(data);
   }, [state]);

   const fetchData = async () => {
      try {
         const response = await fetch(
            `https://zeropick.p-e.kr/api/v1/foods/${state}`,
            {
               method: 'GET',
               credentials: 'include',
               headers: {
                  accept: 'application/json',
               },
            },
         );
         if (!response.ok) throw new Error('Network response was not ok');
         const result = await response.json();
         console.log(result);
         setData(result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   // ID기반 대체당 목록 조회
   const fetchSugarByID = async (id: string) => {
      try {
         const response = await fetch(
            `https://zeropick.p-e.kr/api/v1/foods/${id}/sweeteners`,
            {
               method: 'GET',
               credentials: 'include',
               headers: {
                  accept: 'application/json',
               },
            },
         );
         if (!response.ok) throw new Error('Network response was not ok');
         const result = await response.json();
         console.log('ID기반 대체당 목록 조회', result);
         setSugar(result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   if (!data) return <div>Loading...</div>;

   return (
      <Container>
         <BackArrow url={-1} />
         <Title> {data.foodNmKr}</Title>
         {data.itemReportNo && (
            <Item>품목제조보고번호: {data.itemReportNo}</Item>
         )}

         <NutrientTable data={tableData} />
         {sugar.length > 0 && (
            <Title>
               대체당 <span style={{ color: '#ff9eb3' }}>{sugar.length}</span>개
            </Title>
         )}
         {sugar.map((item, id) => (
            <SugarBox key={id} item={item} id={id} />
         ))}
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
