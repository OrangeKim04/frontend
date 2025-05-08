// NutrientTable.tsx
import {
   useReactTable,
   getCoreRowModel,
   flexRender,
   ColumnDef,
} from '@tanstack/react-table';
import styled from 'styled-components';
import { SubText } from './styles/common';

export type NutrientRow = {
   nutrient: string;
   value: string | number;
   percent?: string;
   indent: boolean;
};

type Props = {
   data: NutrientRow[];
};

const NutrientTable = ({ data }: Props) => {
   const columns: ColumnDef<NutrientRow>[] = [
      {
         accessorFn: row => row.nutrient,
         id: 'nutrient',
         cell: info => info.getValue(),
      },
      {
         accessorFn: row => row.value,
         id: 'value',
         cell: info => info.getValue(),
      },
      {
         accessorFn: row => row.percent ?? '',
         id: 'percent',
         cell: info => info.getValue(),
         meta: { isPercent: true },
      },
   ];

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   const getColor = (nutrient: string) => {
      if (nutrient === '1회 제공량' || nutrient === '총중량') return '#F0F8FF';
      if (nutrient === '열량') return '#F6FFEE';
      if (
         ['지방', '포화지방', '트랜스지방', '콜레스테롤', '나트륨'].includes(
            nutrient,
         )
      )
         return '#F2F2F2';
      if (['칼슘', '단백질', '탄수화물'].includes(nutrient)) return '#FFF6E9';
      if (
         [
            '당류',
            '갈락토스',
            '과당',
            '당알코올',
            '맥아당',
            '알룰로스',
            '에리트리톨',
            '유당',
            '자당',
            '포도당',
         ].includes(nutrient)
      )
         return '#FFF3F8';
   };

   return (
      <div style={{ marginBottom: '20px' }}>
         <StyledTable>
            <tbody>
               {table
                  .getRowModel()
                  .rows.filter(row => {
                     const { nutrient, value } = row.original;
                     const zeroPattern = /^undefined\s*g$/;
                     const excludeIfZero = [
                        '갈락토스',
                        '과당',
                        '당알코올',
                        '맥아당',
                        '알룰로스',
                        '에리트리톨',
                        '유당',
                        '자당',
                        '포도당',
                     ];
                     if (
                        excludeIfZero.includes(nutrient) &&
                        zeroPattern.test(String(value))
                     ) {
                        return false;
                     }
                     return true;
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
                                 textAlign:
                                    cell.column.id === 'percent' ||
                                    cell.column.id === 'value'
                                       ? 'right'
                                       : 'left',

                                 backgroundColor:
                                    cell.column.id === 'percent' &&
                                    !['총중량', '1회 제공량'].includes(
                                       row.original.nutrient,
                                    )
                                       ? '#F8F3FF'
                                       : 'transparent',
                                 borderBottom:
                                    row.index ===
                                    table.getRowModel().rows.length - 1
                                       ? 'none'
                                       : row.original.nutrient === '1회 제공량'
                                         ? '2px solid #4E4E4E'
                                         : '1px solid #DFDFDF',
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
         </StyledTable>
         <SubText>⚠️ 100g 에 대한 영양성분</SubText>
      </div>
   );
};

export default NutrientTable;

const StyledTable = styled.table`
   width: 100%;
   border-collapse: collapse;
   margin: 10px auto;
   font-size: 0.95rem;
`;
