// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... }

/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("#username").type(Cypress.env("USER"));
  cy.get("#password").type(Cypress.env("PASSWORD"));
  cy.get("button[type='submit']").click({ multiple: true, force: true });
});

Cypress.Commands.add("createExclusion", (name, allergen) => {
  cy.get("header").contains("Exclusions").click();
  cy.contains("New").click();
  cy.get("table").find("tbody").find("tr").first().as("firstRow");

  cy.get("@firstRow").find("input[name='name']").type(name);

  if (allergen) {
    cy.get("@firstRow").find("input[name='allergen']").click({ force: true });
  }
});

Cypress.Commands.add(
  "createCustomer",
  (
    salutation,
    firstName,
    surname,
    startDate,
    email,
    plan,
    daysPerWeek,
    snack,
    breakfast,
    address,
    exclusions,
    notes,
    paymentDay,
    telephone
  ) => {
    cy.get("header").contains("Customers").click();
    cy.contains("New").click();

    cy.get("input[name='salutation']").click();
    cy.get("div[data-g-portal-id='1']").contains(salutation).click();
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='surname']").type(surname);
    cy.get("input[name='startDate']").click();
    cy.get("div[data-g-portal-id='1']").contains(String(startDate)).click();
    cy.get("input[name='email']").type(email);
    cy.get("input[name='daysPerWeek']").click();
    cy.get("div[data-g-portal-id='1']").contains(String(daysPerWeek)).click();
    cy.get("input[name='snack']").click();
    cy.get("div[data-g-portal-id='1']").contains(snack).click();
    cy.get("div[aria-label='breakfast']").click();
    cy.get("div[data-g-portal-id='1']")
      .contains(breakfast ? "Yes" : "No")
      .click();
    cy.get("textarea[name='address']").type(address);
    cy.get("input[name='plan']").click();
    cy.get("div[data-g-portal-id='1']").contains(plan).click();

    cy.get("input[name='exclusions']").click();
    exclusions.forEach((exclusion) => {
      cy.get("div[data-g-portal-id='1']")
        .contains(exclusion)
        .click({ force: true });
    });

    if (notes) {
      cy.get("textarea[name='notes']").type(notes);
    }

    if (paymentDay) {
      cy.get("input[name='paymentDayOfMonth']").type(String(paymentDay));
    }

    if (telephone) {
      cy.get("input[name='telephone']").type(telephone);
    }
    cy.contains("Ok").click();
  }
);

Cypress.Commands.add("createRecipe", (name, description, exclusions) => {
  cy.get("header").contains("Recipes").click();
  cy.contains("New").click();
  cy.get("table").find("tbody").find("tr").first().as("firstRow");

  cy.get("@firstRow").find("input[name='name']").type(name);
  cy.get("@firstRow").find("input[name='description']").type(description);
  cy.get("@firstRow").find("input[name='exclusions']").click();
  cy.get("div[data-g-portal-id='0']").as("dropPortal");
  exclusions.forEach((exclusion) => {
    cy.get("@dropPortal")
      .find("div[role='menubar']")
      .contains(exclusion)
      .click({ force: true });
  });
  cy.get("@firstRow").find("input[name='exclusions']").click();
});