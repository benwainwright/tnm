const listRecipesQuery = `
query ListRecipesQuery {
  listRecipes {
    description
    id
    name
    shortName
    hotOrCold
    allergens
    invalidExclusions
    vegetarianOption {
      description
      id
      name
      shortName
    }
    potentialExclusions {
      allergen
      id
      name
    }
  }
}
`;

export default listRecipesQuery;
