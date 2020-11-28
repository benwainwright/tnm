import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

import type { AppState } from "../../lib/rootReducer";

import Recipe from "../../domain/Recipe";

interface RecipesState {
  items: Recipe[];
  page: number;
}

const initialState: RecipesState = {
  items: [],
  page: 0,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    createRecipe: {
      reducer: (state, action: PayloadAction<Recipe>): void => {
        state.items.push(action.payload);
      },
      prepare: (
        recipe: Recipe
      ): { payload: PayloadAction<Recipe>["payload"] } => {
        return {
          payload: {
            ...recipe,
            id: nanoid(),
          },
        };
      },
    },

    removeRecipe: (state, action: PayloadAction<Recipe>): typeof state => ({
      ...state,
      items: state.items.filter((recipe) => recipe.id !== action.payload.id),
    }),
    updateRecipe: (state, action: PayloadAction<Recipe>): void => {
      const index = state.items.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      state.items[index] = { ...action.payload };
    },
  },
});

export default recipesSlice;

const { createRecipe, removeRecipe, updateRecipe } = recipesSlice.actions;

export const allRecipesSelector = (state: AppState): Recipe[] =>
  state.recipes.items;

export { createRecipe, removeRecipe, updateRecipe };
