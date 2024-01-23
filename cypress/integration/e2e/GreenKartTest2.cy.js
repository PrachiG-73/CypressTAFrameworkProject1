/// <reference types = 'cypress'/>
it("test2", function () {
  cy.visit(Cypress.env('url')+"/seleniumPractise/#/");
  cy.get("input.search-keyword ").type("ca");
  cy.get("button.search-button").click();
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

  cy.get('.cart .cart-icon').click()
  cy.get('.action-block').find('button[type="button"]').contains('PROCEED TO CHECKOUT').click()
  cy.get('@productsLocator').contains('Place Order').click()
  cy.log('End of the Testcase')
});
