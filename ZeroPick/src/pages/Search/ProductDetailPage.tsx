import { useLocation } from 'react-router-dom';
import BackArrow from '@/components/BackArrow';
import styled from 'styled-components';
import {
   useReactTable,
   getCoreRowModel,
   flexRender,
} from '@tanstack/react-table';
import { Nuturitions } from '@/data/mockdata';

const Container = styled.div`
   gap: 16px;
   overflow-y: auto;
   padding: 20px;
   position: relative;
   padding-bottom: 100px;
`;

const ProductDetailPage = () => {
   const data = Nuturitions;
   const columns = [
      { accessorKey: 'nutrient', cell: info => info.getValue() },
      { accessorKey: 'value', cell: info => info.getValue() },
   ];
   const tableData = [
      {
         nutrient: '총중량',
         value: `${data.totalWeight} g`,
         indent: false,
      },
      {
         nutrient: '1회 제공량',
         value: `${data.servingSize} g`,
         indent: false,
      },
      {
         nutrient: '열량',
         value: `${data.energy} kcal`,
         indent: false,
      },
      {
         nutrient: '단백질',
         value: `${data.protein} g`,
         indent: false,
      },

      {
         nutrient: '탄수화물',
         value: `${data.carbohydrate} g`,
         indent: false,
      },
      {
         nutrient: '칼슘',
         value: `${data.carbohydrate} g`,
         indent: false,
      },
      {
         nutrient: '나트륨',
         value: `${data.sodium} mg`,
         indent: false,
      },
      {
         nutrient: '콜레스테롤',
         value: `${data.cholesterol} mg`,
         indent: false,
      },
      {
         nutrient: '지방',
         value: `${data.fat} g`,
         indent: false,
      },
      {
         nutrient: '포화지방',
         value: `${data.saturatedFat} g`,
         indent: true,
      },
      {
         nutrient: '트랜스지방',
         value: `${data.transFat} g`,
         indent: true,
      },
      {
         nutrient: '당류',
         value: `${data.sugars} g`,
         indent: false,
      },
      {
         nutrient: '갈락토스',
         value: `${data.galactose} g`,
         indent: true,
      },
      {
         nutrient: '과당',
         value: `${data.fructose} g`,
         indent: true,
      },
      {
         nutrient: '당알코올',
         value: `${data.sugarAlcohol} g`,
         indent: true,
      },
      {
         nutrient: '맥아당',
         value: `${data.maltose} g`,
         indent: true,
      },
      {
         nutrient: '알룰로스',
         value: `${data.allulose} g`,
         indent: true,
      },
      {
         nutrient: '에리트리톨',
         value: `${data.erythritol} g`,
         indent: true,
      },
      {
         nutrient: '유당',
         value: `${data.lactose} g`,
         indent: true,
      },
      {
         nutrient: '자당',
         value: `${data.sucrose} g`,
         indent: true,
      },
      {
         nutrient: '포도당',
         value: `${data.glucose} g`,
         indent: true,
      },
   ];
   const table = useReactTable({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });
   const getColor = nutrient => {
      if (nutrient === '1회 제공량' || nutrient === '총중량') return '#F0F8FF';
      if (nutrient === '열량') return '#F6FFEE';
      if (
         nutrient === '지방' ||
         nutrient === '포화지방' ||
         nutrient === '트랜스지방' ||
         nutrient === '콜레스테롤' ||
         nutrient === '나트륨'
      )
         return '#F2F2F2';

      if (
         nutrient === '칼슘' ||
         nutrient === '단백질' ||
         nutrient === '탄수화물'
      )
         return '#FFF6E9';
      if (
         nutrient === '당류' ||
         nutrient === '갈락토스' ||
         nutrient === '과당' ||
         nutrient === '당알코올' ||
         nutrient === '맥아당' ||
         nutrient === '알룰로스' ||
         nutrient === '에리트리톨' ||
         nutrient === '유당' ||
         nutrient === '자당' ||
         nutrient === '포도당'
      )
         return '#FFF3F8'; // 원하는 색깔로 변경
   };

   return (
      <Container>
         <BackArrow url={-1} />
         <Title> {data.foodNmKr}</Title>
         <Item>품목신고번호: {data.itemReportNo}</Item>
         <Table>
            <tbody>
               {table
                  .getRowModel()
                  .rows.filter(row => {
                     const value = row.original.value;
                     return !/^0\s*(g|mg|kcal)$/.test(value);
                  })
                  .map(row => (
                     <tr
                        key={row.id}
                        style={{
                           backgroundColor: getColor(row.original.nutrient),
                           fontFamily: 'Regular',
                        }}>
                        {row.getVisibleCells().map(cell => (
                           <td
                              key={cell.id}
                              style={{
                                 padding: '10px 20px',
                                 paddingLeft:
                                    cell.column.id === 'nutrient' &&
                                    row.original.indent
                                       ? '50px'
                                       : '20px',
                              }}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext(),
                              )}
                           </td>
                        ))}
                     </tr>
                  ))}
            </tbody>
         </Table>
      </Container>
   );
};
export default ProductDetailPage;

const Title = styled.h2`
   font-size: 1.6rem;
   margin-bottom: 20px;
   font-family: Bold;
   text-align: center;
   margin-top: 0;
`;

const Item = styled.div`
   font-size: 0.95rem;
   font-family:  Regular
   padding: 8px;
   border-radius: 6px;
`;
const Table = styled.table`
   width: 100%;
   border-collapse: collapse;
   margin: 20px auto;
   font-size: 0.95rem;
`;
