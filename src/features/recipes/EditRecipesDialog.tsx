// import fuzzy from "fuzzy";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormField,
  Heading,
  Layer,
  Select,
  TextInput,
} from "grommet";
import { Checkmark, Close } from "grommet-icons";
import Recipe, { HotOrCold } from "../../domain/Recipe";
import { useDispatch, useSelector } from "react-redux";
import { ApiRequestFunction } from "../../lib/apiRequestCreator";
import React from "react";
import { allExclusionsSelector } from "../../features/exclusions/exclusionsSlice";
import { debounce } from "lodash";
// import styled from "styled-components";

interface EditRecipesDialogProps {
  recipe: Recipe;
  recipes: Recipe[];
  thunk: ApiRequestFunction<Recipe>;
  onOk: () => void;
  title: string;
  onCancel: () => void;
}

// const SelectOption = styled.div`
//   margin-top: 0.3rem;
//   margin-bottom: 0.3rem;
// `;

// const VegeterianOptionElement = styled.li`
//   list-style: none;
//   margin: 0;
//   font-size: 0.8rem;
//   padding: 0;
// `;

const ONSUBMIT_DEBOUNCE = 500;

const EditRecipesDialog: React.FC<EditRecipesDialogProps> = (props) => {
  const [recipe, setRecipe] = React.useState(props.recipe);
  // const [vegOptionSearch, setVegOptionSearch] = React.useState("");

  // const filteredRecipes = vegOptionSearch
  //   ? fuzzy
  //       .filter(vegOptionSearch, props.recipes, {
  //         extract: (el) => `${el.description} ${el.name} ${el.shortName}`,
  //       })
  //       .map((item) => item.original)
  //   : props.recipes;

  const dispatch = useDispatch();
  const exclusions = useSelector(allExclusionsSelector);

  const onSubmit = debounce(async (): Promise<void> => {
    // eslint-disable-next-line no-console
    await dispatch(props.thunk(recipe));
    props.onOk();
  }, ONSUBMIT_DEBOUNCE);

  const formRecipe = {
    ...recipe,
    invalidExclusions: recipe.invalidExclusions?.map((exclusionId) =>
      exclusions.find((otherExclusion) => otherExclusion.id === exclusionId)
    ),
  };

  return (
    <Layer>
      <Card>
        <Form
          value={formRecipe}
          onReset={(): void => {
            setRecipe(props.recipe);
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(nextRecipeData: any): void => {
            // eslint-disable-next-line no-console
            console.log(nextRecipeData);
            const stateRecipe = {
              ...nextRecipeData,
              invalidExclusions:
                nextRecipeData.invalidExclusions?.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (exclusion: any) => exclusion.id
                ) ?? [],
            };
            setRecipe(stateRecipe);
          }}
          onSubmit={onSubmit}
        >
          <CardHeader margin="none" pad="medium" alignSelf="center">
            <Heading margin="none" level={3}>
              {props.title}
            </Heading>
          </CardHeader>
          <CardBody pad="medium" alignSelf="center">
            <FormField name="name" label="Name" required>
              <TextInput name="name" />
            </FormField>
            <FormField name="shortName" label="Short Name" required>
              <TextInput name="shortName" />
            </FormField>
            <FormField name="description" label="Description">
              <TextInput name="description" />
            </FormField>
            <FormField name="hotOrCold" label="Served" required>
              <Select
                options={[HotOrCold.Hot, HotOrCold.Cold, HotOrCold.Both]}
                name="hotOrCold"
              />
            </FormField>
            <FormField name="allergens" label="Allergens">
              <TextInput name="allergens" />
            </FormField>
            <FormField name="potentialExclusions" label="Customisations">
              <Select
                multiple
                closeOnChange={false}
                name="potentialExclusions"
                options={exclusions}
                labelKey="name"
                valueKey="name"
              />
            </FormField>
            <FormField name="invalidExclusions" label="Exclusions">
              <Select
                multiple
                closeOnChange={false}
                name="invalidExclusions"
                options={exclusions}
                labelKey="name"
                valueKey="name"
              />
            </FormField>
            {/*
            <FormField name="vegatarianOption" label="Vegetarian Option">
              <Select
                closeOnChange={false}
                name="vegetarianOption"
                options={filteredRecipes}
                onSearch={(text: string) => {
                  // eslint-disable-next-line no-console
                  console.log(text);
                  setVegOptionSearch(text);
                }}
                labelKey="shortName"
                valueKey="name"
              >
                {(option: Recipe) => {
                  // eslint-disable-next-line no-console
                  return (
                    <SelectOption>
                      <ul>
                        <VegeterianOptionElement>
                          <strong>{option.shortName}</strong>
                        </VegeterianOptionElement>
                        <VegeterianOptionElement>
                          {option.name}
                        </VegeterianOptionElement>
                      </ul>
                    </SelectOption>
                  );
                }}
              </Select>
            </FormField>
              */}
          </CardBody>
          <CardFooter pad="medium" alignSelf="center" justify="center">
            <Button
              icon={<Checkmark color="brand" size="small" />}
              label="Ok"
              type="submit"
              name="submit"
            />
            <Button
              icon={<Close color="brand" size="small" />}
              onClick={props.onCancel}
              label="Cancel"
            />
            <Button type="reset" name="reset" label="Reset" />
          </CardFooter>
        </Form>
      </Card>
    </Layer>
  );
};

export default EditRecipesDialog;
