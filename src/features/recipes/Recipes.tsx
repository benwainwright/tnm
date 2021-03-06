import {
  Button,
  Header,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import {
  createRecipe,
  errorSelector,
  updateRecipe,
} from "../recipes/recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import EditRecipesDialog from "./EditRecipesDialog";
import { HotOrCold } from "../../domain/Recipe";
import React from "react";
import RecipesRow from "../recipes/RecipesRow";
import useRecipes from "./useRecipes";

const Recipes: React.FC = () => {
  const dispatch = useDispatch();
  const { recipes } = useRecipes();
  const error = useSelector(errorSelector);
  const [showCreate, setShowCreate] = React.useState(false);

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Recipes</Heading>

        <Button
          primary
          size="small"
          label="New"
          a11yTitle="New Customer"
          onClick={(): void => {
            setShowCreate(true);
          }}
        />
        {showCreate && (
          <EditRecipesDialog
            recipe={{
              id: "0",
              shortName: "",
              hotOrCold: HotOrCold.Hot,
              name: "",
              description: "",
              potentialExclusions: [],
            }}
            title="Create Recipe"
            thunk={createRecipe}
            onOk={(): void => {
              setShowCreate(false);
            }}
            onCancel={(): void => {
              setShowCreate(false);
            }}
          />
        )}
      </Header>
      {error && <Text color="status-error">{error}</Text>}
      {recipes.length > 0 ? (
        <Table alignSelf="start">
          <TableHeader>
            <TableRow>
              <TableCell>
                <strong>Short Name</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Customisations</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes

              .slice()
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              .sort((a, b) => (a.name < b.name ? 1 : -1))
              .reverse()
              .map((recipe) => (
                <RecipesRow
                  key={recipe.id}
                  recipe={recipe}
                  onChange={(newRecipe): void => {
                    dispatch(updateRecipe(newRecipe));
                  }}
                />
              ))}
          </TableBody>
        </Table>
      ) : (
        <Text>
          You&apos;ve not added any recipes yet... Click the &apos;new&apos;
          button above to get started!
        </Text>
      )}
    </React.Fragment>
  );
};

export default Recipes;
