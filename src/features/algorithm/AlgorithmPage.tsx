import { Heading, Paragraph } from "grommet";
import React from "react";
import Customer, { Snack } from "../../domain/Customer";
import Recipe, { HotOrCold } from "../../domain/Recipe";
import { CustomerPlan, PlanConfiguration } from "../customers/types";
import SelectionExample from "./SelectionExample";

const mockRecipe = (id: string, name: string): Recipe => ({
  id,
  name,
  shortName: "",
  hotOrCold: HotOrCold.Hot,
  potentialExclusions: [],
});

const mockCustomer = (
  id: string,
  firstName: string,
  plan: CustomerPlan
): Customer => ({
  id,
  firstName,
  surname: "",
  salutation: "",
  address: "",
  telephone: "",
  startDate: "",
  email: "",
  daysPerWeek: 0,
  plan: {
    name: "foo",
    mealsPerDay: 0,
    costPerMeal: 0,
    category: "EQ",
  },
  newPlan: plan,
  snack: Snack.Large,
  breakfast: true,
  exclusions: [],
});

const example1 = {
  customers: [
    mockCustomer("A", "Chris", {
      deliveries: [
        {
          items: [
            {
              name: "EQ",
              quantity: 7,
            },
          ],
          extras: [],
        },
      ],
      configuration: {} as PlanConfiguration,
    }),
    mockCustomer("B", "Alex", {
      deliveries: [
        {
          items: [
            {
              name: "Micro",
              quantity: 7,
            },
          ],
          extras: [],
        },
      ],
      configuration: {} as PlanConfiguration,
    }),

    mockCustomer("C", "Jess", {
      deliveries: [
        {
          items: [
            {
              name: "Micro",
              quantity: 7,
            },
            {
              name: "Mass",
              quantity: 2,
            },
          ],
          extras: [],
        },
      ],
      configuration: {} as PlanConfiguration,
    }),
  ],
  deliverySelection: [
    mockRecipe("0", "A"),
    mockRecipe("1", "B"),
    mockRecipe("2", "C"),
    mockRecipe("3", "D"),
    mockRecipe("4", "E"),
  ],
  name: "Simple Picking Example",
};

const AlgorithmPage = (): JSX.Element => {
  return (
    <>
      <Heading level={2}>Picking Algorithm</Heading>
      <Paragraph fill>
        Examples on this page are generated using the same code that generates
        the meal plan, so they should be up to date. If you&apos;d like me to
        add more specific examples to see how the planner would pick it, please
        ask
      </Paragraph>
      <SelectionExample {...example1} />
    </>
  );
};

export default AlgorithmPage;
