import Customer from "../domain/Customer";
import Exclusion from "../domain/Exclusion";
import Recipe from "../domain/Recipe";
import { isSelectedMeal } from "./is-selected-meal";
import { SelectedItem, SelectedMeal } from "./types";

const hasExclusions = (exclusion: Exclusion, meal: Recipe | undefined) =>
  meal?.potentialExclusions.some((value) => value.id === exclusion.id);

const createExclusionsString = (
  customer: Customer,
  item: SelectedMeal,
  allMeals: Recipe[]
) => {
  const realMeal = allMeals.find((theMeal) => theMeal.id === item.recipe.id);

  const matchingExclusions = customer.exclusions.filter((allergen) => {
    return realMeal?.potentialExclusions.some(
      (value) => value.id === allergen.id
    );
  });

  return matchingExclusions.map((exclusion) => exclusion.name).join(", ");
};

const createVariantString = (
  customer: Customer,
  item: SelectedItem,
  allMeals: Recipe[]
): string => {
  if (!isSelectedMeal(item)) {
    return item.chosenVariant;
  }

  const exclusions = createExclusionsString(customer, item, allMeals);

  const exclusionsString = exclusions ? `$ (${exclusions})` : ``;

  return `${item.chosenVariant}${exclusionsString}`;
};

const createMealWithVariantString = (
  customer: Customer,
  meal: SelectedMeal,
  allMeals: Recipe[]
): string =>
  `${meal.recipe.shortName}/${createVariantString(customer, meal, allMeals)}`;

export const createVariant = (
  customer: Customer,
  meal: SelectedItem,
  allMeals: Recipe[]
): {
  customisation: boolean;
  allergen: boolean;
  string: string;
  exclusions?: string;
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

  const matchingExclusions = customer.exclusions.filter((exclusion) =>
    hasExclusions(exclusion, realMeal)
  );

  const string =
    matchingExclusions.length > 0
      ? `${meal.chosenVariant} (${matchingExclusions
          .map((exclusion) => exclusion.name)
          .join(", ")})`
      : `${meal.chosenVariant}`;

  return {
    customisation: matchingExclusions.length > 0,
    allergen: matchingExclusions.length > 0 && matchingExclusions[0].allergen,
    exclusions: createExclusionsString(customer, meal, allMeals),
    mealWithVariantString: createMealWithVariantString(
      customer,
      meal,
      allMeals
    ),
    string,
  };
};
