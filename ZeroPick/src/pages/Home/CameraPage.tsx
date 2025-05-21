import { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Cropper, { ReactCropperElement } from 'react-cropper';
import BackArrow from '@/components/BackArrow';
import 'cropperjs/dist/cropper.css';
import { Button } from '@/components/styles/common';

const CameraPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  const [image, setImage] = useState<string | undefined>(undefined);
  const cropperRef = createRef<ReactCropperElement>();

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl); // 넘어온 이미지 URL을 상태에 저장
    }
  }, [imageUrl]);

  const onCrop = () => {
    const cropper = cropperRef?.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toDataURL(); // 호출은 유지, 결과는 사용하지 않음
    }
  };

  const getCropData = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const dataURL = cropper.getCroppedCanvas().toDataURL();
      console.log(dataURL); // 크롭된 이미지 URL을 바로 확인
      navigate('/home/result');
    } else {
      alert('사진을 찍어주세요');
    }
  };

  return (
    <Wrapper>
      <BackArrow url="/home" />
      <Title>영양성분을 찍어주세요</Title>

      <Cropper
        src={image} // 사용자가 선택한 사진
        crop={onCrop} // 크롭 함수 호출
        ref={cropperRef}
        viewMode={1} // 크롭 영역이 이미지를 벗어나지 않게
        background={false}
        guides={false}
        style={{ width: '100%', height: '76.9%', marginBottom: '15px' }}
      />
      <Button onClick={getCropData}>사진 제출하기</Button>
    </Wrapper>
  );
};

export default CameraPage;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1;
  box-sizing: border-box;
`;

const Title = styled.p`
  margin: 0;
  font-family: SemiBold;
  font-size: 1.4rem;
  margin: 0;
  text-align: center;
  margin: 20px 0;
`;
