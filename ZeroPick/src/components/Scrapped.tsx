import BeforeScrapIcon from '@/assets/recipe/스크랩 전.svg';
import AfterScrapIcon from '@/assets/recipe/스크랩 후.svg';
import { useState, useEffect } from 'react';
import { customFetch } from '@/hooks/CustomFetch';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
type Props = { foodId: number };
const Scrap = ({ foodId }: Props) => {
   const navigate = useNavigate();
   const [isScrapped, setIsScrapped] = useState<boolean>();
   useEffect(() => {
      const ProductScrapped = async () => {
         try {
            const result = await customFetch(
               `/ocr/${foodId}/exists`,
               {
                  method: 'GET',
                  headers: { accept: 'application/json' },
               },
               navigate,
            );
            console.log('스크랩 여부', result);
            setIsScrapped(result);
         } catch (error) {
            console.error('Fetch error:', error);
         }
      };
      ProductScrapped();
   }, []);
   const handleScrap = async () => {
      try {
         const result = await customFetch(
            `/ocr/${foodId}`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
            },
            navigate,
         );
         console.log('스크랩 성공', result);
         alert('상품이 저장되었어요');
         setIsScrapped(true);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   const handleUnScrap = async () => {
      try {
         const result = await customFetch(
            `/ocr/${foodId}`,
            {
               method: 'DELETE',
               headers: { 'Content-Type': 'application/json' },
            },
            navigate,
         );
         console.log('스크랩 취소 성공', result);
         setIsScrapped(false);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   return (
      <>
         <Img
            src={isScrapped ? AfterScrapIcon : BeforeScrapIcon}
            onClick={isScrapped ? handleUnScrap : handleScrap}
         />
      </>
   );
};
export default Scrap;
const Img = styled.img`
   position: absolute;
   right: 20px;
   top: 22px;
   cursor: pointer;
`;
