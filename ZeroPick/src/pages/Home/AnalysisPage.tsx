import backIcon from '@/assets/Left Arrow.svg';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const AnalysisPage = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { id, itemReportNo, ocrText } = location.state || {};
   const [data, setData] = useState<ExtendedNutrientData | null>();
   const [sugar, setSugar] = useState<Substitute[]>([]);
   const tableData = data ? createNutrientTableData(data) : [];

   // OCR로 감미료 정보 확인
   const fetchOcrData = async () => {
      try {
         const result = await customFetch(
            '/ocr/confirm',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  itemReportNo,
                  ocrText,
               }),
            },
            navigate,
         );
         console.log('감미료 정보 확인', result);
         setSugar(result.matchedSubstitutes);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   // 품목제조보고번호로 상세 정보 검색
   const fetchNutritientsByNum = async (itemReportNo: string) => {
      try {
         const result = await customFetch(
            `/foods/search-item-detail?itemReportNo=${itemReportNo}`,
            {
               method: 'GET',
               headers: {
                  accept: 'application/json',
               },
            },
            navigate,
         );
         console.log('품목제조보고번호로 상세 정보 검색', result);
         setData(result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   // ID기반 식품 상세 조회
   const fetchNutritientsByID = async (id: string) => {
      try {
         const result = await customFetch(
            `/foods/${id}`,
            {
               method: 'GET',
               headers: {
                  accept: 'application/json',
               },
            },
            navigate,
         );
         console.log('ID기반 식품 상세 조회', result);
         setData(result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };

   useEffect(() => {
      if (id) {
         fetchNutritientsByID(id);
         fetchOcrData();
      } else {
         fetchOcrData();
         fetchNutritientsByNum(itemReportNo);
      }
   }, []);

   if (!sugar || !data) return <RingLoading />;
   return (
      <Container>
         <BackIcon src={backIcon} onClick={() => navigate('/home')} />
         <Scrap foodId={data.id} />
         <Title>{data.foodNmKr}</Title>
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
export default AnalysisPage;
const Container = styled.div`
   gap: 16px;
   position: relative;
   padding: 20px;
   position: relative;
   padding-bottom: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;
const BackIcon = styled.img`
   position: absolute;
   left: 20px;
   top: 22px;
   cursor: pointer;
`;
const Title = styled.p`
   margin: 0;
   font-family: Bold;
   font-size: 1.4rem;
   margin: 0;
   text-align: center;
   width: 70%;
   margin-bottom: 10px;
`;

const Item = styled.div`
   width: 100%;
   font-size: 0.95rem;
   font-family: Regular;
   padding: 8px;
   border-radius: 6px;
   word-wrap: break-word;
`;
