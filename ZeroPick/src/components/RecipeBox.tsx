import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { WhiteBox } from '@/components/styles/common';
import { Recipe } from '@/pages/Recipe/RecipeListPage';
import { RecipeResponse } from '@/pages/Recipe/RecipeDetailPage';
interface RecipeBoxProps {
   item: RecipeResponse | Recipe;
   id: string | number;
}
export const RecipeBox = ({ item, id }: RecipeBoxProps) => {
   const ingredientsStr =
      Array.isArray(item?.ingredients) &&
      item?.ingredients.every(ing => typeof ing === 'string')
         ? item?.ingredients.join(',\u00A0') // 문자열 배열 처리
         : Array.isArray(item?.ingredients) &&
             item?.ingredients.every(
                ing => typeof ing === 'object' && 'name' in ing,
             )
           ? item?.ingredients.map(ing => ing.name).join(',\u00A0') // 객체 배열 처리
           : ''; // 기본값 처리

   const navigate = useNavigate();
   return (
      <WhiteBox
         key={id}
         onClick={() => navigate(`/recipe/${item.title}`, { state: { item } })}>
         <RecipeTitle>{item.title}</RecipeTitle>
         <RecipeIngredients>
            {'재료: '}
            {'\u00A0'}
            {ingredientsStr.length > 26
               ? `${ingredientsStr.slice(0, 26)}...`
               : ingredientsStr}
         </RecipeIngredients>
      </WhiteBox>
   );
};
const RecipeTitle = styled.p`
   margin: 0 5px;
   margin-top: 8px;
   font-family: SemiBold;
   font-size: 17px;
`;

const RecipeIngredients = styled.p`
   margin: 0 5px;
   margin-bottom: 8px;
   font-family: Regular;
`;
