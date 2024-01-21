import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
/// <reference types ="cypress"/>
const homePage = new HomePage();
const shopPage = new ShopPage();
const shopCheckoutPage = new ShopCheckoutPage();
const purchasePage = new PurchasePage();

Given('I open Ecommerce Page',()=>{
    cy.visit(Cypress.env('url')+"/angularpractice/");

})

When('I add items to cart',()=>{
    homePage.getShopTab().click();
    cy.AddToCart("Nokia"); //custom method from command.js
  
    //Parametarize the test , add multiple products
    //jquery foreach
    this.testData.productName.forEach((product) => {
      cy.AddToCart(product); //custom method from command.js
    });
    shopPage.getCheckoutButton().should("contain", " Checkout ( 4 )").click();
})

When('Validate the total prices',()=>{
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
}) 

Then('Select country Purchase and verify Thankyou Message',()=>{
    purchasePage.getCountryField().type("India");
    purchasePage.getCountrySuggestions().contains("India").click();
    purchasePage.getCheckbox().check({ force: true });
    purchasePage.getPurchaseButton().click();
    purchasePage.getSuccessMessage().then((message) => {
      const actualText = message.text();
      expect(actualText.includes("Success")).to.be.true;
    });
})


