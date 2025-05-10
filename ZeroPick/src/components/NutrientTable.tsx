// NutrientTable.tsx
import {
   useReactTable,
   getCoreRowModel,
   flexRender,
   ColumnDef,
} from '@tanstack/react-table';
import styled from 'styled-components';
import { SubText } from './styles/common';
import React from 'react';

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
      if (nutrient === '총중량') return '#F0F8FF';
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
                  .map((row, idx, arr) => (
                     <React.Fragment key={row.id}>
                        <tr
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
                                       !['총중량'].includes(
                                          row.original.nutrient,
                                       )
                                          ? '#F8F3FF'
                                          : 'transparent',
                                    borderBottom:
                                       row.index === arr.length - 1
                                          ? 'none'
                                          : '1px solid #DFDFDF',
                                    fontFamily: 'Regular',
                                 }}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                 )}
                              </td>
                           ))}
                        </tr>
                        {row.original.nutrient === '총중량' && (
                           <tr>
                              <td colSpan={table.getAllColumns().length}>
                                 <NutrientHeader>
                                    <SubText style={{ fontSize: '15.2px' }}>
                                       100 g당
                                    </SubText>
                                    <NutrientHeaderRight>
                                       <SubText>
                                          1일 영양성분
                                          <br /> 기준치에 대한 비율
                                       </SubText>
                                    </NutrientHeaderRight>
                                 </NutrientHeader>
                              </td>
                           </tr>
                        )}
                     </React.Fragment>
                  ))}
            </tbody>
         </StyledTable>
      </div>
   );
};

export default NutrientTable;

const StyledTable = styled.table`
   width: 100%;
   border-collapse: collapse;
   margin: 0px auto;
   font-size: 0.95rem;
`;
const NutrientHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-left: 20px;
   padding-right: 10px;
   background-color: #f0f8ff;
   border-bottom: 2px solid black;
`;

const NutrientHeaderRight = styled.div`
   width: 110px;
`;
