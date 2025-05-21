import { Title, SubText } from './styles/common';
import { SugarBox } from './SugarBox';
import { Substitute } from '@/type/nutritientData';
import styled from 'styled-components';
type Props = {
   sugar: Substitute[];
};
const SugarComponents = ({ sugar }: Props) => {
   console.log(sugar);
   return (
      <>
         {sugar.length > 0 && (
            <StyledTitle>
               대체당 <span style={{ color: '#ff9eb3' }}>{sugar.length}</span>개
            </StyledTitle>
         )}
         {sugar.map((item, id) => (
            <SugarBox key={id} item={item} id={id} />
         ))}
         <SubText>[출처] 식품의약품안전처</SubText>
      </>
   );
};
export default SugarComponents;
const StyledTitle = styled(Title)`
   margin-bottom: 0;
   margin-top: 10px;
`;
