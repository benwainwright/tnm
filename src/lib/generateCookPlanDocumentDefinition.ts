import { RecipeVariantMap } from "../types/CookPlan";
import { DocumentDefinition } from "./downloadPdf";
import formatPlanItem from "./formatPlanItem";
import { PdfBuilder } from "./pdf-builder";

const getCountString = (count: number) => (count > 1 ? ` x ${count}` : ``);

const generateCookPlanDocumentDefinition = (
  cookPlan: Map<string, RecipeVariantMap>[]
): DocumentDefinition => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const date = new Date(Date.now());

  const title = `TNM Cook Plan (printed ${date.toLocaleDateString(
    undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any
  )})`;

  const formatRecipeVariantMapCustomisationsCell = (map: RecipeVariantMap) => {
    const items = Object.keys(map)
      .slice()
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .filter(key => map[key].customisation)
      .flatMap(key =>
        map[key].customers.map(customer => ({
          string: `${customer.surname}, ${customer.firstName} - ${key}`,
          item: map[key]
        }))
      )
      .reduce<
        { string: string; count: number; item: RecipeVariantMap[string] }[]
      >((accum, item) => {
        const found = accum.find(
          reducedItem => reducedItem.string === item.string
        );
        if (found) {
          found.count++;
          return accum;
        } else {
          return [...accum, { string: item.string, count: 1, item: item.item }];
        }
      }, [])
      .sort((a, b) => (a.string > b.string ? 1 : -1))
      .map(item =>
        formatPlanItem(`${item.string}${getCountString(item.count)}`, item.item)
      );
    return {
      ul: items
    };
  };

  const totalMeals = (map: RecipeVariantMap) =>
    Object.values(map).reduce((total, variant) => variant.count + total, 0);

  const formatRecipeVariantMapNoCustomisationsCell = (
    map: RecipeVariantMap
  ) => ({
    ul: Object.keys(map)
      .slice()
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .filter(key => !map[key].customisation)
      .sort((a, b) => (a > b ? 1 : -1))
      .map(key => formatPlanItem(`${key} x ${map[key].count}`, map[key]))
  });

  const makeLabelCell = (name: string, map: RecipeVariantMap) => [
    {
      text: `${name} (x ${totalMeals(map)})`,
      style: "rowHeader"
    }
  ];

  const convertPlanToRows = (
    individualCookPlan: Map<string, RecipeVariantMap>
  ) => {
    const all = Array.from(individualCookPlan.entries());
    return all.map(([recipeName, value]) => [
      makeLabelCell(recipeName, value),
      formatRecipeVariantMapNoCustomisationsCell(value),
      formatRecipeVariantMapCustomisationsCell(value)
    ]);
  };

  const returnVal = cookPlan.reduce<PdfBuilder>(
    (builder, plan, index) =>
      builder
        .header(`Cook ${index + 1}`)
        .table(convertPlanToRows(plan), 2, [200, "*", "*"])
        .pageBreak(),
    new PdfBuilder(title, true)
  );
  return returnVal.toDocumentDefinition();
};

export default generateCookPlanDocumentDefinition;
