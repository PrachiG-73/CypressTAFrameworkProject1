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
// Cypress.Commands.add('login', (email, password) => { ... })
import { ShopPage } from "../e2e/PageObjects/ShopPage";
const shopPage = new ShopPage();
Cypress.Commands.add("AddToCart", (ProductName) => {
  shopPage.getProductsMainCard().each((mobileName, index, list) => {
    if (mobileName.text().includes(ProductName)) {
      shopPage.getAddButton().eq(index).click();
    }
  });
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
