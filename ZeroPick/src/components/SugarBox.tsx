import { useState } from 'react';
import styled from 'styled-components';
import { WhiteBox } from './styles/common';
import arrowIcon from '@/assets/dropDownArrow.svg';
import { Substitute } from '@/type/nutritientData';
import { motion, AnimatePresence } from 'framer-motion';

const dropVariants = {
   hidden: { height: 0, opacity: 0, overflow: 'hidden' },
   visible: {
      height: 'auto',
      opacity: 1,
      overflow: 'visible',
      transition: { duration: 0.2 },
   },
};

const splitByPeriod = (text: string) =>
   text
      .split(/(?<=\.)\s*/) // 마침표 뒤 공백 기준 분할
      .filter(Boolean);

export const SugarBox = ({ item, id }: { item: Substitute; id: number }) => {
   const [isOpen, setIsOpen] = useState(false);

   const descriptionLines = splitByPeriod(item.description);
   const sideEffectLines = splitByPeriod(item.sideEffect);
   return (
      <ClickableWhiteBox key={id} onClick={() => setIsOpen(prev => !prev)}>
         <Row>
            <MainInfo>
               <Label>{item.name}</Label>
               <Value>{item.category}</Value>
               <Value>{item.calorie}</Value>
            </MainInfo>
            <ArrowIcon src={arrowIcon} isOpen={isOpen} />
         </Row>
         <AnimatePresence initial={false}>
            {isOpen && (
               <motion.div
                  key="content"
                  variants={dropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden">
                  <GiRow>
                     <GiLabel>당지수(GI)</GiLabel>
                     <GiValue>{item.giIndex}</GiValue>
                  </GiRow>
                  <InfoItem>
                     <Column>
                        {descriptionLines.map((line, i) => (
                           <TextRow key={`desc-${i}`}>
                              <Dash>-</Dash>
                              <Description>{line}</Description>
                           </TextRow>
                        ))}
                        {sideEffectLines.map((line, i) => (
                           <TextRow key={`side-${i}`}>
                              <Dash style={{ color: 'red' }}>-</Dash>
                              <Description>{line}</Description>
                           </TextRow>
                        ))}
                     </Column>
                  </InfoItem>
               </motion.div>
            )}
         </AnimatePresence>
      </ClickableWhiteBox>
   );
};
const ClickableWhiteBox = styled(WhiteBox)`
   cursor: pointer;
`;
const Row = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const MainInfo = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`;

const ArrowIcon = styled.img<{ isOpen: boolean }>`
   transition: transform 0.3s;
   transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const GiRow = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   margin-top: 10px;
   margin-bottom: 10px;
`;

const GiLabel = styled.p`
   font-family: Regular;
   margin: 0;
   font-size: 15.5px;
`;

const GiValue = styled(GiLabel)`
   color: #ff9eb3;
`;

const InfoItem = styled.div`
   margin-bottom: 15px;
   font-size: 16px;
   color: #555;
`;

const Column = styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
`;

const TextRow = styled.div`
   display: flex;
   gap: 5px;
`;

const Dash = styled.p`
   font-family: Regular;
   margin: 0;
   font-size: 15.5px;
`;

const Description = styled(Dash)``;

const Label = styled.div`
   font-weight: 600;
   color: #333;
   font-size: 17px;
`;

const Value = styled.div`
   font-size: 14px;
   color: #777;
`;
