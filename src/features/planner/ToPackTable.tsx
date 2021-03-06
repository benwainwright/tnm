import { Box, Button, Table, Text, ThemeContext } from "grommet";
import {
  clearPlanner,
  customerSelectionsSelector,
  plannedMealsSelector,
} from "./planner-reducer";
import { useDispatch, useSelector } from "react-redux";
import { ExtendedParagraph } from "../../components";
import { PrintableTbody } from "../../components/printable-table";
import React from "react";
import Recipe from "../../domain/Recipe";

import ToPackRow from "./ToPackRow";
import styled from "styled-components";
import useRecipes from "../recipes/useRecipes";

interface ToPackTableProps {
  onNext: () => void;
  onClear: () => void;
}

export const SectionWithPageBreak = styled.section`
  @media print {
    page-break-before: always;
  }
`;

const ToPackTable: React.FC<ToPackTableProps> = (props) => {
  const dispatch = useDispatch();

  const customerMeals = useSelector(customerSelectionsSelector);
  const planned = useSelector(plannedMealsSelector);
  const { recipes } = useRecipes();

  if (!customerMeals) {
    return <Text>You need to select some meals</Text>;
  }

  const columns = customerMeals.reduce<number>(
    (numColumns, customer) =>
      customer.meals.length > numColumns ? customer.meals.length : numColumns,
    0
  );

  type ExcludesUndefined = <T>(x: T | undefined) => x is T;

  const deliveryMeals = planned
    .filter((Boolean as unknown) as ExcludesUndefined)
    .reduce<Recipe[]>((meals, meal) => {
      if (!meals.find((mealNeedle) => mealNeedle.name === meal.name)) {
        meals.push(meal);
      }
      return meals;
    }, []);

  return (
    <SectionWithPageBreak>
      <ExtendedParagraph margin={{ top: "medium" }}>
        Each customer has now been allocated a meal according to their plan and
        the meals you have selected. If you wish adjust meals according to
        individual customer needs, just click on the cells in the table below.
      </ExtendedParagraph>
      <ExtendedParagraph>
        Once you are finish, click <strong>finalize</strong> to download the
        printable delivery and cook plans, or click <strong>cancel</strong> to
        clear everything and start again.
      </ExtendedParagraph>

      <Box
        direction="row"
        gap="small"
        margin={{ top: "medium", bottom: "large" }}
      >
        <Button primary label="Finalize" onClick={(): void => props.onNext()} />
        <Button
          onClick={(): void => {
            dispatch(clearPlanner());
            props.onClear();
          }}
          label="Clear"
        />
      </Box>
      <ThemeContext.Extend
        value={{
          global: {
            text: {
              medium: {
                size: "10pt",
              },
            },
          },
        }}
      >
        <Table alignSelf="start">
          <PrintableTbody>
            {customerMeals
              .slice()
              .sort((a, b) =>
                a.customer.surname.toLowerCase() >
                b.customer.surname.toLowerCase()
                  ? 1
                  : // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    -1
              )
              .map((customerPlan) => (
                <ToPackRow
                  key={customerPlan.customer.id}
                  columns={columns}
                  customerSelection={customerPlan}
                  deliveryMeals={deliveryMeals}
                  allRecipes={recipes}
                />
              ))}
          </PrintableTbody>
        </Table>
      </ThemeContext.Extend>
    </SectionWithPageBreak>
  );
};

export default ToPackTable;
