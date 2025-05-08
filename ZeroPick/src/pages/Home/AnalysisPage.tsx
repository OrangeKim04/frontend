import backIcon from '@/assets/Left Arrow.svg';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NutrientTable from '@/components/NutrientTable';
import { SugarBox } from '@/components/SugarBox';
import {
   createNutrientTableData,
   ExtendedNutrientData,
   Substitute,
} from '@/data/nutritientData';

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
         const response = await fetch(
            `https://zeropick.p-e.kr/api/v1/ocr/confirm`,
            {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  itemReportNo: itemReportNo,
                  ocrText: ocrText,
               }),
            },
         );
         if (!response.ok) throw new Error('Network response was not ok');
         const result = await response.json();
         console.log('감미료 정보 확인', result);
         setSugar(result.matchedSubstitutes);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   // 품목제조보고번호로 상세 정보 검색
   const fetchNutritientsByNum = async (itemReportNo: string) => {
      try {
         const response = await fetch(
            `https://zeropick.p-e.kr/api/v1/foods/search-item-detail?itemReportNo=${itemReportNo}`,
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
         console.log('품목제조보고번호로 상세 정보 검색', result);
         setData(result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   // ID기반 식품 상세 조회
   const fetchNutritientsByID = async (id: string) => {
      try {
         const response = await fetch(
            `https://zeropick.p-e.kr/api/v1/foods/${id}`,
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
         console.log('ID기반 식품 상세 조회', result);
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
   useEffect(() => {
      if (id) {
         fetchNutritientsByID(id);
         fetchSugarByID(id);
      } else {
         fetchOcrData();
         fetchNutritientsByNum(itemReportNo);
      }
   }, []);

   if (!sugar || !data) return <div>loading..</div>;
   return (
      <Container style={{ height: '100vh', position: 'relative' }}>
         <BackIcon src={backIcon} onClick={() => navigate('/home')} />
         <Title>{data.foodNmKr}</Title>

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
export default AnalysisPage;
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
font-family:  Regular
padding: 8px;
border-radius: 6px;
 word-wrap: break-word;
`;
