/// <reference types ="cypress"/>
import { HomePage } from "./PageObjects/HomePage";
import { ShopPage } from "./PageObjects/ShopPage";
import { ShopCheckoutPage } from "../e2e/PageObjects/ShopCheckoutPage";
import { PurchasePage } from "./PageObjects/PurchasePage";

before(function () {
  cy.fixture("example").then(function (testData) {
    this.testData = testData;
  });
  Cypress.config("defaultCommandTimeout", 8000);
});

it("ProtoCommerce", function () {
  const homePage = new HomePage();
  const shopPage = new ShopPage();
  const shopCheckoutPage = new ShopCheckoutPage();
  const purchasePage = new PurchasePage();

  cy.visit(Cypress.env('url')+"/angularpractice/");
  /*
  cy.get('.form-group input[name="name"]').type('John')
  cy.get('.form-group select#exampleFormControlSelect1').select('Female').should('have.value','Female')*/

  homePage.getNameField().type(this.testData.name);
  homePage.getNameField().should("have.attr", "minLength", "2");

  homePage
    .getNameField()
    .should("exist")
    .then((element) => {
      var propName = element.prop("minLength");
      cy.log(propName);
    });

  homePage.getTwoWayDataField().should("have.value", this.testData.name);

  homePage
    .getGenderDropdown()
    .select(this.testData.gender)
    .should("have.value", "Male");

  homePage.getEntrepenuerRadiobutton().should("be.disabled");

  /* use this command to pause and debug 
     cy.pause()  */
  //Shop tab operations
  homePage.getShopTab().click();
  cy.AddToCart("Nokia"); //custom method from command.js

  //Parametarize the test , add multiple products
  //jquery foreach
  this.testData.productName.forEach((product) => {
    cy.AddToCart(product); //custom method from command.js
  });
  shopPage.getCheckoutButton().should("contain", " Checkout ( 4 )").click();
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
  purchasePage.getCountryField().type("India");
  purchasePage.getCountrySuggestions().contains("India").click();
  purchasePage.getCheckbox().check({ force: true });
  purchasePage.getPurchaseButton().click();
  purchasePage.getSuccessMessage().then((message) => {
    const actualText = message.text();
    expect(actualText.includes("Success")).to.be.true;
  });
  // purchasePage.getSuccessMessage().should('contain.text','Success!')
});
