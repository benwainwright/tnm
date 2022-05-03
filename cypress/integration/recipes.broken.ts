import { COGNITO_PASSWORD, COGNITO_USER } from "../support/constants";

describe("The recipes page", () => {
  before(() => {
    cy.seed();
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.loginByCognitoApi(COGNITO_USER, COGNITO_PASSWORD);
      cy.visit("/");
      cy.contains("Recipes").click();
    });

    it("should render a page with the correct title", () => {
      cy.get("h2").contains("Recipes");
    });

    it("Should render the empty data message on first page load", () => {
      cy.get("body").should("not.contain", "table");
      cy.contains("You've not added any recipes yet...");
    });

    it("Should pop up the 'create recipe' dialog when you click the 'new' button", () => {
      cy.contains("New").click();

      cy.contains("Create Recipe");
    });

    it("should allow you to add and edit a couple of recipes which then persist after page reload", () => {
      cy.createRecipe("Sandwich", "A delicious sandwich", [], "sand");
      cy.createRecipe("Salad", "A beautiful salad", [], "salad");
      cy.createRecipe("Chocolate", "A creamy chocolate bar", [], "choco");

      cy.wait(1000);
      cy.visit("/");
      cy.contains("Recipes").click();

      cy.get("tbody").find("tr").first().as("firstRow");
      cy.get("@firstRow").contains("Chocolate");
      cy.get("@firstRow").contains("A creamy chocolate bar");

      cy.get("tbody").find("tr").first().next().as("secondRow");
      cy.get("@secondRow").contains("Salad");
      cy.get("@secondRow").contains("A beautiful salad");

      cy.get("tbody").find("tr").last().as("lastRow");
      cy.get("@lastRow").contains("Sandwich");
      cy.get("@lastRow").contains("A delicious sandwich");
    });

    describe("the delete button", () => {
      it("should allow you to delete a row after you've confirmed", () => {
        cy.get("tbody")
          .find("tr")
          .last()
          .find("button[aria-label='Delete']")
          .click();
        cy.contains("Ok").click();
        cy.get("tbody").find("tr").should("have.length", 2);
      });

      it("does not delete a row if you click on the confirm dialog", () => {
        cy.get("tbody")
          .find("tr")
          .last()
          .find("button[aria-label='Delete']")
          .click();
        cy.contains("Cancel").click();
        cy.get("tbody").find("tr").should("have.length", 2);
      });
    });
  });
});
