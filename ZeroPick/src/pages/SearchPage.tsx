import searchIcon from '@/assets/SearchB.svg';
import styled from 'styled-components';
import { Items } from '@/data/mockdata';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/styles/common';
const SearchPage = () => {
   const navigate = useNavigate();
   return (
      <Container style={{ backgroundColor: 'white', padding: '20px' }}>
         <SearchBar>
            <Img src={searchIcon} />
            <Input placeholder="상품을 검색해 보세요" />
         </SearchBar>
         <ItemList>
            {Items.map((item, id) => (
               <Item key={id} onClick={() => navigate(`/search/${id}`)}>
                  <ItemText>{item}</ItemText>
                  <ItemText>&gt;</ItemText>
               </Item>
            ))}
         </ItemList>
      </Container>
   );
};
export default SearchPage;

const SearchBar = styled.div`
   width: 100%;
   background-color: #ededed;
   border-radius: 20px;
   box-sizing: border-box;
   display: flex;
   align-items: center;
   padding-left: 20px;
   position: relative;
`;
const Input = styled.input`
   width: 100%;
   height: 50px;
   background-color: #ededed;
   padding-left: 35px;
   box-sizing: border-box;
   border: none;
   border-radius: 20px;
   outline: none;
   font-family: Regular;
   font-size: 0.9rem;
   input::placeholder {
      color: gray;
   }
`;
const Img = styled.img`
   width: 26px;
   position: absolute;
   letf: 0;
   opacity: 0.4;
`;
const Item = styled.div`
   width: 100%;
   height: 70px;
   border-bottom: 0.5px solid #ff9eb3;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 20px;
   box-sizing: border-box;
   cursor: pointer;
   flex-shrink: 0; /* 줄어들지 않도록 설정 */
`;
const ItemList = styled.div`
   width: 100%;
   height: calc(100vh - 152px);
   display: flex;
   flex-direction: column;
   overflow-y: auto; /* 세로 스크롤 활성화 */
`;
const ItemText = styled.p`
   font-family: SemiBold;
   margin: 0;
`;
