import Recipe, { HotOrCold } from "../../domain/Recipe";

export const mockRecipe = (id: string, name: string): Recipe => ({
  id,
  name,
  shortName: "",
  hotOrCold: HotOrCold.Hot,
  potentialExclusions: [],
});
