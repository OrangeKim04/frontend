import React, { useState, useRef } from 'react';
import { Camera, CameraType } from 'react-camera-pro';
import styled from 'styled-components';
import icon from '@/assets/camera_button.svg';
const Wrapper = styled.div`
   position: fixed;
   width: 100%;
   height: 100%;
   z-index: 1;
`;

const Control = styled.div`
   width: 100%;
   position: absolute;
   right: 0;
   bottom: 70px;
   z-index: 10;
   display: flex;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
`;

const TakePhotoButton = styled.img`
   width: 80px;
`;

const CameraPage = () => {
   const [numberOfCameras, setNumberOfCameras] = useState(0);
   const [image, setImage] = useState<string | null>(null);
   const camera = useRef<CameraType>(null);

   return (
      <Wrapper>
         <Camera
            ref={camera}
            aspectRatio="cover"
            numberOfCamerasCallback={setNumberOfCameras}
         />
         <Control>
            <TakePhotoButton
               src={icon}
               onClick={() => {
                  if (camera.current) {
                     const photo = camera.current.takePhoto();
                     console.log(photo);
                     setImage(photo);
                  }
               }}
            />
         </Control>
      </Wrapper>
   );
};

export default CameraPage;
