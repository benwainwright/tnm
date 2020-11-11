import React from "react";
import Recipe from "../domain/Recipe";
import { allergens } from "../domain/Recipe";
import { deleteRecipe } from "../actions/recipes";
import { Button, TableRow, TableCell } from "grommet";
import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (oldRecipe: Recipe, newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => (
  <TableRow>
    <TableCell>
      <TableCellInputField
        thing={props.recipe}
        value={props.recipe.name}
        mutator={(newRecipe, event) => {
          newRecipe.name = event.target.value;
        }}
        onChange={props.onChange}
      />
    </TableCell>
    <TableCell>
      <TableCellInputField
        thing={props.recipe}
        value={props.recipe.description}
        mutator={(newRecipe, event) => {
          newRecipe.description = event.target.value;
        }}
        onChange={props.onChange}
      />
    </TableCell>
    <TableCell>
      <TableCellSelectField
        multiple
        thing={props.recipe}
        options={allergens}
        value={props.recipe.allergens}
        mutator={(newRecipe, item) => {
          newRecipe.allergens = item.value;
        }}
        onChange={props.onChange}
      />
    </TableCell>

    <TableCell>
      <Button onClick={() => deleteRecipe(props.recipe)} label="Delete" />
    </TableCell>
  </TableRow>
);

export default RecipesRow;
