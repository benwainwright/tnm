import Customer, { Snack } from "../../domain/Customer";
import Exclusion from "../../domain/Exclusion";
import { CustomerPlan } from "../customers/types";

export const mockCustomer = (
  id: string,
  firstName: string,
  plan: CustomerPlan,
  exclusions?: Exclusion[]
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
  exclusions: exclusions ?? [],
});
