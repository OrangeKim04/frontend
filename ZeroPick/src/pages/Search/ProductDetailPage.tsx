import { useLocation } from 'react-router-dom';
import BackArrow from '@/components/BackArrow';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
   useReactTable,
   getCoreRowModel,
   flexRender,
   ColumnDef,
} from '@tanstack/react-table';

type NutrientRow = {
   nutrient: string;
   value: string | number;
   indent: boolean;
};
type NutrientData = {
   totalWeight: number;
   servingSize: number;
   energy: number;
   protein: number;
   carbohydrate: number;
   calcium: number;
   sodium: number;
   cholesterol: number;
   fat: number;
   saturatedFat: number;
   transFat: number;
   sugars: number;
   galactose: number;
   fructose: number;
   sugarAlcohol: number;
   maltose: number;
   allulose: number;
   erythritol: number;
   lactose: number;
   sucrose: number;
   glucose: number;
};
export type ExtendedNutrientData = NutrientData & {
   id: number;
   foodNmKr: string;
   itemReportNo: string;
};

const ProductDetailPage = () => {
   const { state } = useLocation();
   const [data, setData] = useState<ExtendedNutrientData | null>();
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
   ];
   useEffect(() => {
      fetchData();
      if (data) console.log(data);
   }, [state]);
   const tableData: NutrientRow[] = data
      ? [
           {
              nutrient: '총중량',
              value: data.totalWeight,
              indent: false,
           },
           {
              nutrient: '1회 제공량',
              value: data.servingSize,
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
        ]
      : [];
   const table = useReactTable({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });
   const getColor = (nutrient: string) => {
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
   const fetchData = async () => {
      try {
         const response = await fetch(
            `https://zeropick.p-e.kr/api/v1/foods/${state}`,
            {
               method: 'GET',
               credentials: 'include',
               headers: {
                  accept: 'application/json',
               },
            },
         );
         if (!response.ok) throw new Error('Network response was not ok');
         const result = await response.json();
         setData(result);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   if (!data) return <div>Loading...</div>;

   return (
      <Container>
         <BackArrow url={-1} />
         <Title> {data.foodNmKr}</Title>
         {data.itemReportNo && <Item>품목신고번호: {data.itemReportNo}</Item>}

         <Table>
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
const Container = styled.div`
   gap: 16px;
   overflow-y: auto;
   padding: 20px;
   position: relative;
   padding-bottom: 100px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;
const Title = styled.h2`
   width: 70%;
   font-size: 1.6rem;
   margin-bottom: 20px;
   font-family: Bold;
   text-align: center;
   margin-top: 0;
`;

const Item = styled.div`
   width: 100%;
   font-size: 0.95rem;
   font-family:  Regular
   padding: 8px;
   border-radius: 6px;
    word-wrap: break-word;
`;
const Table = styled.table`
   width: 100%;
   border-collapse: collapse;
   margin: 20px auto;
   font-size: 0.95rem;
`;
