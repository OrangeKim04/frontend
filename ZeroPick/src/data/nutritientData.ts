// nutrientData.ts
export interface NutrientRow {
   nutrient: string;
   value: string | number;
   percent?: string;
   indent: boolean;
}

export interface NutrientData {
   totalWeight: number;
   servingSize: number;
   energy: number;
   protein: number;
   proteinPercent: number;
   carbohydrate: number;
   carbohydratePercent: number;
   calcium: number;
   sodium: number;
   sodiumPercent: number;
   cholesterol: number;
   cholesterolPercent: number;
   fat: number;
   fatPercent: number;
   saturatedFat: number;
   saturatedFatPercent: number;
   transFat: number;
   sugars: number;
   sugarsPercent: number;
   galactose: number;
   fructose: number;
   sugarAlcohol: number;
   maltose: number;
   allulose: number;
   erythritol: number;
   lactose: number;
   sucrose: number;
   glucose: number;
}
export type ExtendedNutrientData = NutrientData & {
   id: number;
   foodNmKr: string;
   itemReportNo: string;
};

export type Substitute = {
   calorie: string;
   category: string;
   description: string;
   giIndex: string;
   name: string;
   sideEffect: string;
};
export const createNutrientTableData = (
   data: NutrientData | null,
): NutrientRow[] => {
   if (!data) return [];

   return [
      { nutrient: '총중량', value: data.totalWeight, indent: false },
      { nutrient: '1회 제공량', value: data.servingSize, indent: false },
      { nutrient: '열량', value: `${data.energy} kcal`, indent: false },
      {
         nutrient: '단백질',
         value: `${data.protein} g`,
         percent: `${data.proteinPercent}%`,
         indent: false,
      },
      {
         nutrient: '탄수화물',
         value: `${data.carbohydrate} g`,
         percent: `${data.carbohydratePercent}%`,
         indent: false,
      },
      { nutrient: '칼슘', value: `${data.calcium} mg`, indent: false },
      {
         nutrient: '나트륨',
         value: `${data.sodium} mg`,
         percent: `${data.sodiumPercent}%`,
         indent: false,
      },
      {
         nutrient: '콜레스테롤',
         value: `${data.cholesterol} mg`,
         percent: `${data.cholesterolPercent}%`,
         indent: false,
      },
      {
         nutrient: '지방',
         value: `${data.fat} g`,
         percent: `${data.fatPercent}%`,
         indent: false,
      },
      {
         nutrient: '포화지방',
         value: `${data.saturatedFat} g`,
         percent: `${data.saturatedFatPercent}%`,
         indent: true,
      },
      { nutrient: '트랜스지방', value: `${data.transFat} g`, indent: true },
      {
         nutrient: '당류',
         value: `${data.sugars} g`,
         percent: `${data.sugarsPercent}%`,
         indent: false,
      },
      { nutrient: '갈락토스', value: `${data.galactose} g`, indent: true },
      { nutrient: '과당', value: `${data.fructose} g`, indent: true },
      { nutrient: '당알코올', value: `${data.sugarAlcohol} g`, indent: true },
      { nutrient: '맥아당', value: `${data.maltose} g`, indent: true },
      { nutrient: '알룰로스', value: `${data.allulose} g`, indent: true },
      { nutrient: '에리트리톨', value: `${data.erythritol} g`, indent: true },
      { nutrient: '유당', value: `${data.lactose} g`, indent: true },
      { nutrient: '자당', value: `${data.sucrose} g`, indent: true },
      { nutrient: '포도당', value: `${data.glucose} g`, indent: true },
   ];
};
