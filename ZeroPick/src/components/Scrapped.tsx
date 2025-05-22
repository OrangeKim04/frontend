import BeforeScrapIcon from '@/assets/recipe/스크랩 전.svg';
import AfterScrapIcon from '@/assets/recipe/스크랩 후.svg';
import { useState, useEffect } from 'react';
import { customFetch } from '@/hooks/CustomFetch';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductDeleteModal from './Modal/ProductDeleteModal';
type Props = { foodId: number };
const Scrap = ({ foodId }: Props) => {
   const navigate = useNavigate();
   const [isScrapped, setIsScrapped] = useState<boolean>();
   const [isOpen, setIsOpen] = useState<boolean>(false);
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
            setIsScrapped(result.scrapped);
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

   return (
      <>
         <Img
            src={isScrapped ? AfterScrapIcon : BeforeScrapIcon}
            onClick={isScrapped ? () => setIsOpen(true) : handleScrap}
         />
         {isOpen && (
            <ProductDeleteModal onClose={() => setIsOpen(false)} id={foodId} />
         )}
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
