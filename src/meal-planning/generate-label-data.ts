import { CustomerMealsSelection, isSelectedMeal, SelectedItem } from "./types";
import { createVariant } from "./create-variant";
import Recipe from "../domain/Recipe";
import Customer from "../domain/Customer";

const stringifyValue = (thing: unknown) =>
  typeof thing === "number" ? String(thing) : thing;

const stringifyKeys = <T extends Record<string, unknown>>(thing: T) =>
  Object.fromEntries(
    Object.entries(thing).map(([entry, value]) => [
      entry,
      stringifyValue(value),
    ])
  );

const isValueString = (
  entry: [key: string, value: unknown]
): entry is [string, string] => typeof entry[1] === "string";

const removeNonStringValues = (
  thing: Record<string, unknown>
): Record<string, string> =>
  Object.fromEntries(Object.entries(thing).filter(isValueString));

const normalize = <T extends Record<string, unknown>>(
  thing: T
): Record<string, string> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = removeNonStringValues(stringifyKeys(thing));

  return rest;
};

const titleCase = (string: string) =>
  string
    .toLocaleLowerCase()
    .split(" ")
    .map((word) => `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1)}`)
    .join(" ");

const convertToStringWithLeadingZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${convertToStringWithLeadingZero(
    day
  )}/${convertToStringWithLeadingZero(month)}/${year}`;
};

const makeLabelObject = (
  customer: Customer,
  item: SelectedItem,
  useByDate: Date,
  allMeals: Recipe[]
) => {
  const { salutation, surname, firstName, ...remainingCustomerProps } =
    customer;
  const defaultCustomerProps = {
    salutation,
    surname,
    firstName,
  };

  if (isSelectedMeal(item)) {
    const variant = createVariant(customer, item, allMeals);
    const { shortName, name, description, hotOrCold, ...remainingRecipeProps } =
      item.recipe;

    return {
      ...defaultCustomerProps,
      shortName,
      name,
      description,
      allergens: `Contains ${
        item.recipe.allergens?.trim()
          ? item.recipe.allergens.trim()
          : "no allergens"
      }`,
      itemPlan: item.chosenVariant,
      customisations: variant.exclusions ?? "",
      hotOrCold: `Enjoy ${hotOrCold}`,
      variantString: variant.string,
      mealLabelString: variant.mealWithVariantString,
      mealName: titleCase(item.recipe.name),
      useBy: `Use by ${formatDate(useByDate)}`,
      ...remainingCustomerProps,
      ...remainingRecipeProps,
    };
  }
  return {
    ...defaultCustomerProps,
    ...remainingCustomerProps,
    useBy: `Use by ${formatDate(useByDate)}`,
    customerName: titleCase(`${customer.firstName} ${customer.surname}`),
    mealName: titleCase(item.chosenVariant),
    itemPlan: "extra",
  };
};

export const generateLabelData = (
  selections: CustomerMealsSelection,
  useByDate: Date,
  allMeals: Recipe[],
  deliveryNumber: number
): ReadonlyArray<Record<string, string>> =>
  selections
    .flatMap((selection) => {
      const delivery = selection.deliveries[deliveryNumber];

      if (typeof delivery === "string") {
        return [];
      }

      return delivery.map((item) =>
        makeLabelObject(selection.customer, item, useByDate, allMeals)
      );
    })
    .map(normalize);
