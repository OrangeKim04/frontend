import { useState } from 'react';
import styled from 'styled-components';
import { WhiteBox } from './styles/common';
import arrowIcon from '@/assets/dropDownArrow.svg';
import { Substitute } from '@/data/nutritientData';

export const SugarBox = ({ item, id }: { item: Substitute; id: number }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <WhiteBox key={id} onClick={() => setIsOpen(prev => !prev)}>
         <Row>
            <MainInfo>
               <Label>{item.name}</Label>
               <Value>{item.category}</Value>
               <Value>{item.calorie}</Value>
            </MainInfo>
            <ArrowIcon src={arrowIcon} isOpen={isOpen} />
         </Row>
         {isOpen && (
            <>
               <GiRow>
                  <GiLabel>당지수(GI)</GiLabel>
                  <GiValue>{item.giIndex}</GiValue>
               </GiRow>
               <InfoItem>
                  <Column>
                     <TextRow>
                        <Dash>-</Dash>
                        <Description>{item.description}</Description>
                     </TextRow>
                     <TextRow>
                        <Dash>-</Dash>
                        <Description>{item.sideEffect}</Description>
                     </TextRow>
                  </Column>
               </InfoItem>
            </>
         )}
      </WhiteBox>
   );
};

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
