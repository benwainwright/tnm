import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Customer from "../domain/Customer";
import Recipe from "../domain/Recipe";
import { extrasLabels, planLabels } from "./config";
import { CustomerPlan, Item } from "../features/customers/types";
import isActive from "./isActive";
import Exclusion from "../domain/Exclusion";

const hasExclusions = (exclusion: Exclusion, meal: Recipe | undefined) => meal?.potentialExclusions.some((value) => value.id === exclusion.id)

export interface SelectedMeal {
  recipe: Recipe;
  chosenVariant: string;
}

interface SelectedExtra {
  chosenVariant: string;
}

export type SelectedItem = SelectedMeal | SelectedExtra;

export type CustomerMealsSelection = {
  customer: Customer;
  deliveries: SelectedItem[][];
}[];

export const createVariant = (
  customer: Customer,
  meal: SelectedItem,
  allMeals: Recipe[]
): {
  customisation: boolean;
  allergen: boolean;
  string: string;
  mealWithVariantString: string;
} => {
  if (!isSelectedMeal(meal)) {
    return {
      customisation: false,
      allergen: false,
      string: meal.chosenVariant,
      mealWithVariantString: meal.chosenVariant,
    };
  }

  const realMeal = allMeals.find((theMeal) => theMeal.id === meal.recipe.id);
  const matchingExclusions = customer.exclusions.filter(exclusion => hasExclusions(exclusion, realMeal));

  const string =
    matchingExclusions.length > 0
      ? `${meal.chosenVariant} (${matchingExclusions
          .map((exclusion) => exclusion.name)
          .join(", ")})`
      : `${meal.chosenVariant}`;

  return {
    customisation: matchingExclusions.length > 0,
    allergen: matchingExclusions.length > 0 && matchingExclusions[0].allergen,
    mealWithVariantString: createMealWithVariantString(
      customer,
      meal,
      allMeals
    ),
    string,
  };
};

const isSelectedMeal = (
  selectedItem: SelectedItem
): selectedItem is SelectedMeal =>
  Boolean((selectedItem as SelectedMeal).recipe);

export const createSelectedItemVariantString = (
  item: SelectedItem,
  customer: Customer,
  allMeals: Recipe[]
): string => {
  if (!isSelectedMeal(item)) {
    return item.chosenVariant;
  }

  const realMeal = allMeals.find((theMeal) => theMeal.id === item.recipe.id);

  const matchingExclusions = customer.exclusions.filter(exclusion => hasExclusions(exclusion, realMeal));

  return matchingExclusions.length > 0
    ? `${item.chosenVariant} (${matchingExclusions
        .map((exclusion) => exclusion.name)
        .join(", ")})`
    : `${item.chosenVariant}`;
};

export const createVariantString = (
  customer: Customer,
  item: SelectedItem,
  allMeals: Recipe[]
): string => {
  if (!isSelectedMeal(item)) {
    return item.chosenVariant;
  }

  const realMeal = allMeals.find((theMeal) => theMeal.id === item.recipe.id);

  const matchingExclusions = customer.exclusions.filter((allergen) => {
    return realMeal?.potentialExclusions.some(
      (value) => value.id === allergen.id
    );
  });

  return matchingExclusions.length > 0
    ? `${item.chosenVariant} (${matchingExclusions
        .map((exclusion) => exclusion.name)
        .join(", ")})`
    : `${item.chosenVariant}`;
};

export const createMealWithVariantString = (
  customer: Customer,
  meal: SelectedMeal,
  allMeals: Recipe[]
): string =>
  `${meal.recipe.shortName}/${createVariantString(customer, meal, allMeals)}`;

const generateDeliveryListFromItem = <
  T extends typeof extrasLabels[number] | typeof planLabels[number]
>(
  item: Item<T>
) =>
  [...new Array(item.quantity)].map(() => ({
    chosenVariant: item.name,
  }));

const getRecipeFromSelection = (
  index: number,
  deliverySelection: DeliveryMealsSelection
) => {
  return deliverySelection[index % deliverySelection.length];
};

const generateDeliveries = (
  plan: CustomerPlan,
  deliverySelections: DeliveryMealsSelection[],
  startPositions: number[]
) => {
  const newStartPositions = [...startPositions];
  return {
    startPositions: newStartPositions,
    deliveries: plan.deliveries.map(
      (delivery, deliveryIndex): SelectedItem[] => {
        const itemList = [
          ...delivery.items
            .flatMap((item) => generateDeliveryListFromItem(item))
            .map((item, index) => ({
              ...item,
              recipe: getRecipeFromSelection(
                index + startPositions[deliveryIndex],
                deliverySelections[deliveryIndex]
              ),
            })),
          ...delivery.extras.flatMap((item) =>
            generateDeliveryListFromItem(item)
          ),
        ];
        newStartPositions[deliveryIndex] += itemList.length;
        return itemList;
      }
    ),
  };
};

const hasPlan = (
  customer: Customer
): customer is Omit<Customer, "newPlan"> &
  Required<Pick<Customer, "newPlan">> => Boolean(customer.newPlan);

export const chooseMeals = (
  deliverySelection: DeliveryMealsSelection[],
  customers: Customer[]
): CustomerMealsSelection =>
  customers
    .filter(isActive)
    .filter(hasPlan)
    .map((customer) => ({
      customer,
      startPositions: deliverySelection.map(() => 0),
    }))
    .reduce<
      {
        customer: Customer;
        deliveries: SelectedItem[][];
        startPositions?: number[];
      }[]
    >((accum, customer, index) => {
      const deliveries = generateDeliveries(
        customer.customer.newPlan,
        deliverySelection,
        accum[index - 1]?.startPositions ?? customer.startPositions
      );
      return [
        ...accum,
        {
          ...customer,
          ...deliveries,
        },
      ];
    }, [])
    .map(({ customer, deliveries }) => ({
      customer,
      deliveries,
    }));
