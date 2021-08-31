import { AnyAction, createAction } from "@reduxjs/toolkit";
import AppState from "../../types/AppState";
import Customer from "../../domain/Customer";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import Recipe from "../../domain/Recipe";
import { defaultDeliveryDays } from "../../lib/config";
import {
  chooseMeals,
  CustomerMealsSelection,
  SelectedMeal,
} from "../../lib/plan-meals";

export interface PlannerState {
  selectedMeals: DeliveryMealsSelection[];
  customerSelections?: CustomerMealsSelection;
}

const initialState: PlannerState = {
  selectedMeals: defaultDeliveryDays.map(() => []),
};

interface GenerateSelectionPayload {
  deliveries: Recipe[][];
}

interface RecipeRemovePayload {
  deliveryIndex: number;
  id: string;
}

interface CustomerSelectionAdjustPayload {
  index: number;
  deliveryIndex: number;
  customer: Customer;
  recipe: Recipe | undefined;
  variant: string;
}

const cloneDelivery = (delivery: Recipe[]) => [...delivery];

const executeAction = <T>(
  state: AppState,
  action: AnyAction | undefined,
  type: string,
  actionCallBack: (
    state: AppState,
    action: { type: string; payload: T }
  ) => AppState
): AppState => {
  const isActionType = (
    testedAction: AnyAction | undefined
  ): testedAction is { type: string; payload: T } =>
    testedAction?.type === type;

  if (isActionType(action)) {
    return actionCallBack(state, action);
  }
  return state;
};

export const clearPlanner = createAction("clearPlanner");
export const adjustCustomerSelection = createAction<
  CustomerSelectionAdjustPayload,
  "adjustCustomerSelection"
>("adjustCustomerSelection");
export const removeMeal = createAction<RecipeRemovePayload, "removeMeal">(
  "removeMeal"
);
export const generateCustomerMeals = createAction<GenerateSelectionPayload>(
  "generateCustomerMeals"
);

// eslint-disable-next-line sonarjs/cognitive-complexity
const plannerReducer = (state: AppState, action?: AnyAction): AppState => {
  const planner = state.planner;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!planner) {
    return {
      ...state,
      planner: initialState,
    };
  }

  const stateAfterRecipeRemove = executeAction<RecipeRemovePayload>(
    state,
    action,
    removeMeal.type,
    (newState, executingAction) => {
      const newSelections = newState.planner.selectedMeals.map(cloneDelivery);
      const found = newSelections[
        executingAction.payload.deliveryIndex
      ].findIndex((recipe) => {
        return recipe.id === executingAction.payload.id;
      });
      if (found > -1) {
        newSelections[executingAction.payload.deliveryIndex].splice(found, 1);
      }

      return {
        ...newState,
        planner: {
          ...newState.planner,
          selectedMeals: newSelections,
        },
      };
    }
  );

  const stateAfterMealGenerate = executeAction<GenerateSelectionPayload>(
    stateAfterRecipeRemove,
    action,
    generateCustomerMeals.type,
    (newState, executingAction) => ({
      ...newState,
      planner: {
        ...newState.planner,
        selectedMeals: executingAction.payload.deliveries.map(cloneDelivery),
        customerSelections: chooseMeals(
          executingAction.payload.deliveries,
          newState.customers.items
        ),
      },
    })
  );

  const stateAfterClearAll = executeAction(
    stateAfterMealGenerate,
    action,
    clearPlanner.type,
    (newState) => ({
      ...newState,
      planner: {
        ...initialState,
      },
    })
  );

  return executeAction<CustomerSelectionAdjustPayload>(
    stateAfterClearAll,
    action,
    adjustCustomerSelection.type,
    (newState, executingAction) => {
      if (!newState.planner.customerSelections) {
        return { ...newState };
      }

      return {
        ...newState,
        planner: {
          ...newState.planner,
          customerSelections: newState.planner.customerSelections.map(
            ({ customer, deliveries }) => ({
              customer: {
                ...customer,
                plan: { ...customer.plan },
                exclusions: customer.exclusions.map((exclusion) => ({
                  ...exclusion,
                })),
              },
              deliveries: deliveries.map((delivery, index) => [
                ...(index === executingAction.payload.deliveryIndex
                  ? delivery.map((item, itemIndex) => ({
                      recipe:
                        itemIndex === executingAction.payload.index &&
                        customer.id === executingAction.payload.customer.id
                          ? executingAction.payload.recipe
                          : (item as SelectedMeal).recipe,

                      chosenVariant:
                        itemIndex === executingAction.payload.index &&
                        customer.id === executingAction.payload.customer.id
                          ? executingAction.payload.variant
                          : item.chosenVariant,
                    }))
                  : delivery),
              ]),
            })
          ),
        },
      };
    }
  );
};

export const plannedMealsSelector = (
  state: AppState
): DeliveryMealsSelection[] => state.planner.selectedMeals;

export const customerSelectionsSelector = (
  state: AppState
): CustomerMealsSelection | undefined => state.planner.customerSelections;

export const customerSelectionSelector =
  (customer: Customer, deliveryIndex: number, index: number) =>
  (state: AppState) =>
    state.planner.customerSelections?.find(
      (selection) => selection.customer.id === customer.id
    )?.deliveries[deliveryIndex][index];

export default plannerReducer;
