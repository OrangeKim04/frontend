import backIcon from '@/assets/Left Arrow.svg';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NutrientTable from '@/components/NutrientTable';
import { SugarBox } from '@/components/SugarBox';
import { customFetch } from '@/hooks/CustomFetch';
import {
  createNutrientTableData,
  ExtendedNutrientData,
  Substitute,
} from '@/type/nutritientData';
import { SubText } from '@/components/styles/common';

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
        navigate
      );

      const typed = result as { matchedSubstitutes: Substitute[] };
      console.log('감미료 정보 확인', typed);
      setSugar(typed.matchedSubstitutes);
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
        navigate
      );

      const typed = result as ExtendedNutrientData;
      console.log('품목제조보고번호로 상세 정보 검색', typed);
      setData(typed);
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
        navigate
      );

      const typed = result as ExtendedNutrientData;
      console.log('ID기반 식품 상세 조회', typed);
      setData(typed);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // ID기반 대체당 목록 조회
  const fetchSugarByID = async (id: string) => {
    try {
      const result = await customFetch(
        `/foods/${id}/sweeteners`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        },
        navigate
      );

      const typed = result as Substitute[];
      console.log('ID기반 대체당 목록 조회', typed);
      setSugar(typed);
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
    <Container style={{ height: '100dvh', position: 'relative' }}>
      <BackIcon src={backIcon} onClick={() => navigate('/home')} />
      <Title>{data.foodNmKr}</Title>

      {data.itemReportNo && (
        <Item>
          품목제조보고번호:{'\u00A0'}
          {'\u00A0'}
          {data.itemReportNo}
        </Item>
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
      <SubText>[출처] 식품의약품안전처</SubText>
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
  font-family: Regular;
  padding: 8px;
  border-radius: 6px;
  word-wrap: break-word;
`;
