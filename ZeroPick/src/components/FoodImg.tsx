import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchImg } from '@/hooks/FetchImg';
import styled from 'styled-components';
type Props = { foodNm: string };

const FoodImg = ({ foodNm }: Props) => {
   const navigate = useNavigate();
   const [img, setImg] = useState<string>();
   useEffect(() => {
      const getImg = async () => {
         if (foodNm) {
            const url = await FetchImg(foodNm, navigate);
            if (url) setImg(url);
         }
      };
      getImg();
   }, [foodNm]);
   return <> {img && <Img src={img} />}</>;
};
export default FoodImg;
const Img = styled.img.attrs({ loading: 'lazy' })`
   width: 320px;
   align-self: center;
`;
