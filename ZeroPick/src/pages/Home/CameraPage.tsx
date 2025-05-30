import { useState, useEffect, createRef, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Cropper, { ReactCropperElement } from 'react-cropper';
import BackArrow from '@/components/BackArrow';
import 'cropperjs/dist/cropper.css';
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
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [image, setImage] = useState<string | undefined>(undefined);
   const [data, setData] = useState<Data | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [inputValue, setInputValue] = useState('');
   const [isScanSuccess, setIsScanSuccess] = useState<boolean>(true);
   const cropperRef = createRef<ReactCropperElement>();
   const lastErrorDetailRef = useRef<string | null>(null); // OCR 실패 시 저장할 ref
   useEffect(() => {
      if (imageUrl) {
         setImage(imageUrl); // 넘어온 이미지 URL을 상태에 저장
      }
   }, [imageUrl]);
   const uploadOcr = async (dataURL: string) => {
      const res = await fetch(dataURL);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append('file', blob, 'image.png');
      try {
         const result = await customFetch(
            '/ocr/scan',
            {
               method: 'POST',
               body: formData,
            },
            navigate,
         );
         console.log('OCR 스캔');
         console.log(result);
         setData(result);
         setIsModalOpen(true);
      } catch (error) {
         const err = error as CustomError;
         console.error('OCR error:', err.detail);
         lastErrorDetailRef.current = err?.detail || '스캔 실패';

         alert('스캔을 실패했어요. 품목보고번호를 입력해주세요.');
         setIsScanSuccess(false);
      } finally {
         setIsLoading(false);
      }
   };
   const searchProduct = async (itemReportNo: string) => {
      try {
         const result = await customFetch(
            `/foods/search-item-name?itemReportNo=${itemReportNo}`,
            {
               method: 'GET',
               headers: { accept: 'application/json' },
            },
            navigate,
         );
         console.log('품목보고번호로 상품명 검색', result);
         setData({
            ...result,
            ocrText: lastErrorDetailRef.current || '',
            itemReportNo: itemReportNo,
         });
         setIsModalOpen(true);
      } catch (error) {
         console.error('Search error:', error);
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
         <Title>품목번호와 원재료명을 찍어주세요</Title>
         <Cropper
            src={image} // 사용자가 선택한 사진
            ref={cropperRef}
            viewMode={1} // 크롭 영역이 이미지를 벗어나지 않게
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
            <Loading>찾는중...</Loading>
         ) : (
            <Button onClick={onSubmit}>제출하기</Button>
         )}
         {isModalOpen && (
            <Modal
               foodNmKr={data?.foodNmKr}
               makerNm={data?.makerNm}
               id={data?.id}
               itemReportNo={data?.itemReportNo}
               ocrText={data?.ocrText}
               onClose={() => setIsModalOpen(false)}
            />
         )}
      </Wrapper>
   );
};

export default CameraPage;
const Wrapper = styled.div`
   width: 100%;
   height: 100dvh;
   z-index: 1;
   box-sizing: border-box;
`;

const Title = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.2rem;
   margin: 0;
   text-align: center;
   margin: 20px 0;
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
