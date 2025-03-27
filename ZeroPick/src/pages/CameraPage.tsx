import { useState, useRef, useEffect } from 'react';
import { Camera, CameraType } from 'react-camera-pro';
import styled from 'styled-components';
import photoIcon from '@/assets/camera_button.svg';
import switchIcon from '@/assets/switch-camera.svg';

const CameraPage = () => {
   const [image, setImage] = useState<string | null>(null);
   const camera = useRef<CameraType>(null);
   useEffect(() => {
      setImage(null);
   }, []);
   return (
      <Wrapper>
         <Title>영양성분을 찍어주세요</Title>
         {image ? (
            <CapturedImg src={image} alt="Captured" />
         ) : (
            <Camera
               ref={camera}
               aspectRatio={3 / 5}
               errorMessages={{}}
               facingMode="environment"
            />
         )}
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
`;
const SwitchButton = styled.img`
   width: 40px;
   position: absolute;
   right: 30px;
`;
const Title = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.4rem;
   margin: 0;
   text-align: center;
   margin: 20px 0;
`;
const CapturedImg = styled.img`
   width: 100%;
`;
