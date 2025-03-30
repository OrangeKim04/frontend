import { useState, useRef, useEffect, createRef } from 'react';
import { Camera, CameraType } from 'react-camera-pro';
import styled from 'styled-components';
import photoIcon from '@/assets/camera/camera_button.svg';
import switchIcon from '@/assets/camera/switch-camera.svg';
import backIcon from '@/assets/Left Arrow.svg';
import checkIcon from '@/assets/camera/Circled Check Button.svg';
import { useNavigate } from 'react-router-dom';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
const CameraPage = () => {
   const navigate = useNavigate();
   const [image, setImage] = useState<string | null>(null);
   const [croppedImage, setCroppedImage] = useState<string | null>(null);
   const camera = useRef<CameraType>(null);
   const cropperRef = createRef<ReactCropperElement>();
   useEffect(() => {
      setImage(null);
   }, []);
   const onCrop = () => {
      const cropper = cropperRef?.current?.cropper;
      if (cropper) {
         const croppedDataURL = cropper.getCroppedCanvas().toDataURL();
         setCroppedImage(croppedDataURL); // Blob으로 변환 없이 바로 Data URL 저장
      }
   };

   const getCropData = () => {
      const cropper = cropperRef.current?.cropper;
      if (cropper) {
         const dataURL = cropper.getCroppedCanvas().toDataURL();
         console.log(dataURL); // 크롭된 이미지 URL을 바로 확인
         setCroppedImage(dataURL); // 바로 croppedImage에 저장
         navigate('/home/result');
      } else {
         alert('사진을 찍어주세요');
      }
   };
   return (
      <Wrapper>
         <BackIcon src={backIcon} onClick={() => navigate('/home')} />
         <Title>영양성분을 찍어주세요</Title>
         {image ? (
            <Cropper
               src={image} // 사용자가 선택한 사진
               crop={onCrop} // 크롭 함수 호출
               ref={cropperRef}
               viewMode={1} // 크롭 영역이 이미지를 벗어나지 않게
               background={false}
               guides={false}
               style={{ width: '100%', height: '76.9%' }}
            />
         ) : (
            <Camera
               ref={camera}
               aspectRatio={3 / 5}
               errorMessages={{}}
               facingMode="environment"
            />
         )}
         {/* <img style={{ width: '100%' }} src={croppedImage} alt="cropped" /> */}
         <Control>
            <SwitchButton
               src={switchIcon}
               onClick={() => {
                  setImage(null);
               }}
            />
            <TakePhotoButton
               src={photoIcon}
               onClick={() => {
                  if (camera.current) {
                     const photo = camera.current.takePhoto();
                     if (typeof photo === 'string') {
                        setImage(photo); // photo가 string일 경우에만 setImage 호출
                     } else {
                        console.error('Photo is not a string');
                     }
                  }
               }}
            />
            <CheckButton src={checkIcon} onClick={getCropData} />
         </Control>
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

const Control = styled.div`
   width: 100%;
   position: absolute;
   right: 0;
   bottom: 25px;
   z-index: 10;
   display: flex;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
`;

const TakePhotoButton = styled.img`
   width: 80px;
   cursor: pointer;
`;
const SwitchButton = styled.img`
   width: 40px;
   position: absolute;
   left: 30px;
   cursor: pointer;
`;
const CheckButton = styled.img`
   width: 40px;
   position: absolute;
   right: 30px;
   cursor: pointer;
`;
const Title = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.4rem;
   margin: 0;
   text-align: center;
   margin: 20px 0;
`;

const BackIcon = styled.img`
   position: absolute;
   left: 20px;
   top: 22px;
   cursor: pointer;
`;
