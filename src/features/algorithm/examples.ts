import { PlanConfiguration } from "../customers/types";
import { mockCustomer } from "./mock-customer";
import { mockRecipe } from "./mock-recipe";

const mockCustomerOne = mockCustomer("A", "Chris", {
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
});

const mockCustomerTwo = mockCustomer("B", "Alex", {
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
});

const mockCustomerThree = mockCustomer("C", "Jess", {
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
});

const example1 = {
  customers: [mockCustomerOne, mockCustomerTwo, mockCustomerThree],
  deliverySelection: [
    mockRecipe("0", "A"),
    mockRecipe("1", "B"),
    mockRecipe("2", "C"),
    mockRecipe("3", "D"),
    mockRecipe("4", "E"),
    mockRecipe("5", "F"),
  ],
  name: "Simple example (six meals)",
};

const example2 = {
  customers: [mockCustomerOne, mockCustomerTwo, mockCustomerThree],
  deliverySelection: [
    mockRecipe("0", "A"),
    mockRecipe("1", "B"),
    mockRecipe("2", "C"),
  ],
  name: "Simple example (three meals)",
};

export const examples = [example1, example2];
