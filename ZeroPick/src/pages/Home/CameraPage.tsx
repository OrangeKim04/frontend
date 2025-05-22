import { useState, useEffect, createRef, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import BackArrow from '@/components/BackArrow';
import { Button } from '@/components/styles/common';
import Modal from '@/components/Modal/Modal';
import { customFetch } from '@/hooks/CustomFetch';

type Data = {
  id?: string;
  itemReportNo?: string;
  foodNmKr: string;
  makerNm?: string | null;
  ocrText?: string;
};

type CustomError = Error & {
  detail?: string;
  errorCode?: string;
};

const CameraPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl;

  const [image, setImage] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Data | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isScanSuccess, setIsScanSuccess] = useState<boolean>(true);
  const cropperRef = createRef<ReactCropperElement>();
  const lastErrorDetailRef = useRef<string | null>(null);

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);

  const uploadOcr = async (dataURL: string) => {
    const res = await fetch(dataURL);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append('file', blob, 'image.png');
    try {
      const result = await customFetch<Data>(
        '/ocr/scan',
        {
          method: 'POST',
          body: formData,
        },
        navigate
      );
      console.log('OCR 스캔 성공:', result);
      setData(result);
      setIsModalOpen(true);
    } catch (error) {
      const err = error as CustomError;
      console.error('OCR 실패:', err.detail);
      lastErrorDetailRef.current = err?.detail || '스캔 실패';

      alert('스캔을 실패했어요. 품목보고번호를 입력해주세요.');
      setIsScanSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const searchProduct = async (itemReportNo: string) => {
    try {
      const result = await customFetch<Data>(
        `/foods/search-item-name?itemReportNo=${itemReportNo}`,
        {
          method: 'GET',
          headers: { accept: 'application/json' },
        },
        navigate
      );
      console.log('품목보고번호로 검색 성공:', result);
    if (result) {
      setData({
        ...result,
        foodNmKr: result.foodNmKr ?? '',
        ocrText: lastErrorDetailRef.current || '',
        itemReportNo: itemReportNo,
      });
      setIsModalOpen(true);
    } else {
      alert('상품 정보를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('검색 실패:', error);
    alert('품목보고번호가 없어요.');
  } finally {
    setIsLoading(false);
  }
};

  const onSubmit = async () => {
    setIsLoading(true);
    if (inputValue.trim()) {
      await searchProduct(inputValue.trim());
    } else {
      const cropper = cropperRef.current?.cropper;
      if (cropper) {
        const dataURL = cropper.getCroppedCanvas().toDataURL();
        await uploadOcr(dataURL);
      }
    }
  };

  return (
    <Wrapper>
      <BackArrow url="/home" />
      <Title>원재료명을 찍어주세요</Title>

      <Cropper
        src={image}
        ref={cropperRef}
        viewMode={1}
        background={false}
        guides={false}
        style={{ width: '100%', height: '400px', marginBottom: '15px' }}
      />

      {!isScanSuccess && (
        <Input
          placeholder="품목제조보고번호를 입력하세요."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          disabled={isLoading}
        />
      )}

      {isLoading ? (
        <Loading>찾는 중...</Loading>
      ) : (
        <Button onClick={onSubmit}>제출하기</Button>
      )}

      {isModalOpen && data && (
        <Modal
          foodNmKr={data.foodNmKr}
          makerNm={data.makerNm}
          id={data.id}
          itemReportNo={data.itemReportNo}
          ocrText={data.ocrText}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Wrapper>
  );
};

export default CameraPage;

// ---------- Styled Components ----------
const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  z-index: 1;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-family: SemiBold;
  font-size: 1.4rem;
  margin: 20px 0;
  text-align: center;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  ::placeholder {
    font-family: Regular;
  }
`;

const Loading = styled.p`
  font-size: 20px;
  color: red;
  text-align: center;
  margin-top: 10px;
  font-family: SemiBold;
`;
