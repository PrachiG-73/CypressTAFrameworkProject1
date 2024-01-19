/// <reference types = 'cypress'/>
it("test1", function () {
  cy.visit(Cypress.env('url')+"/seleniumPractise/#/");
  cy.get("input.search-keyword ").type("ca");
  cy.get("button.search-button").click();
  cy.get(".product").should("have.length", 5);
  cy.get(".product:visible").should("have.length", 4);
  //Parent child chaining
  cy.get(".products").as("productsLocator");
  cy.get("@productsLocator").find(".product").should("have.length", 4); //finds descendent of give locator
  cy.get("div.product .product-action")
    .eq(2)
    .click()
    .then(function () {
      console.log("clicked add to cart button"); //to remove async behaviour of non cypress console module we have added it in then()
    });
  //Add item to the cart using name
  cy.get("div.product").each(($e1, index, $list) => {
    const vegText = $e1.find("h4.product-name").text();
    if (vegText.includes("Carrot")) {
      cy.wrap($e1).find("button").click();
    }
  });

  //Verify logo text
  cy.get(".brand.greenLogo").as("brandLogo");
  cy.get("@brandLogo").should("have.text", "GREENKART");
  //get logo text
  cy.get("@brandLogo").then(function (logoElement) {
    cy.log(logoElement.text()); //this is cypress fn so it will execute step by step
  });
  cy.log('End of the Testcase')
});
