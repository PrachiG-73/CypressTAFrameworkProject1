/// <reference types="Cypress" />
import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../PageObjects/HomePage";
import { ShopPage } from "../PageObjects/ShopPage";
import { ShopCheckoutPage } from "../PageObjects/ShopCheckoutPage";
import { PurchasePage } from "../PageObjects/PurchasePage";
const homePage = new HomePage();
const shopPage = new ShopPage();
const shopCheckoutPage = new ShopCheckoutPage();
const purchasePage = new PurchasePage();
let name;
Given('I open Ecommerce Page', function () {
  cy.visit(Cypress.env('url') + "/angularpractice/");
})

When('I add items to cart', function () {
  homePage.getShopTab().click();
  cy.AddToCart("Nokia"); //custom method from command.js

  //Parametarize the test , add multiple products
  //jquery foreach
  this.testData.productName.forEach((product) => {
    cy.AddToCart(product); //custom method from command.js
  });
  shopPage.getCheckoutButton().should("contain", " Checkout ( 4 )").click();
})

When('Validate the total prices', function () {
  var sum = 0;
  shopCheckoutPage
    .getColumnIndividualTotalAmount()
    .each((totalAmount, index, Amounts) => {
      const amountText = totalAmount.text();
      var splitTotalAmount = amountText.split(" ");
      splitTotalAmount = splitTotalAmount[1].trim();
      sum = Number(sum) + Number(splitTotalAmount);
    })
    .then(function () {
      cy.log(sum);
    });

  shopCheckoutPage.getTotalAmount().then((finalAmountText) => {
    var finalAmountText = finalAmountText.text();
    var finalAmount = finalAmountText.split(" ");
    finalAmount = finalAmount[1].trim();
    expect(Number(finalAmount)).to.equal(sum);
  });

  shopCheckoutPage.getMainCheckoutButton().click();
});

Then('Select country Purchase and verify Thankyou Message', function () {
  purchasePage.getCountryField().type("India");
  purchasePage.getCountrySuggestions().contains("India").click();
  purchasePage.getCheckbox().check({ force: true });
  purchasePage.getPurchaseButton().click();
  purchasePage.getSuccessMessage().then((message) => {
    const actualText = message.text();
    expect(actualText.includes("Success")).to.be.true;
  })
})
//new

When('filling the form details', function (dataTable) {
  name = dataTable.rawTable[1][0];
  homePage.getNameField().type(dataTable.rawTable[1][0]);
  homePage.getGenderDropdown().select(dataTable.rawTable[1][1]).should("have.value", "Male");
})

When('Validate the forms behaviour', function () {
  homePage
    .getNameField()
    .should("exist")
    .then((element) => {
      var propName = element.prop("minLength");
      cy.log(propName);
    });
  homePage.getTwoWayDataField().should("have.value", name);
  homePage.getEntrepenuerRadiobutton().should("be.disabled");
  homePage.getNameField().should("have.attr", "minLength", "2");

})

Then('Select the shop page', function () {
  homePage.getShopTab().click();
})








