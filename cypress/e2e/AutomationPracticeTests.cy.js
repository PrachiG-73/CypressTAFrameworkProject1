/// <reference types = 'cypress'/>
it("AP Testing 1", function () {
  //set env var from config.js
  cy.visit(Cypress.env('url')+"/AutomationPractice/");

  //Checkbox
  cy.get('input[name="checkBoxOption1"]')
    .check()
    .should("be.checked")
    .and("have.value", "option1");
  cy.get('input[name="checkBoxOption1"]').uncheck().should("not.be.checked");
  cy.get('input[type="checkBox"]').check(["option2", "option3"]);

  //Static dropdown
  cy.get("#dropdown-class-example")
    .select("option3")
    .should("have.value", "option3");

  //Dynamic dropdown
  cy.get("#autocomplete").type("ind");
  cy.get(".ui-menu-item div").each(($e1, index, $list) => {
    if ($e1.text() == "India") {
      //cy.wrap($e1).click();
      cy.get(".ui-menu-item div").get($e1).click();
    }
  });
  cy.get("#autocomplete").type("India");

  //Hide/Show
  cy.get("#displayed-text").should("be.visible");
  cy.get("#hide-textbox").click();
  cy.get("#displayed-text").should("not.be.visible");
  cy.get("#show-textbox").click();
  cy.get("#displayed-text").should("be.visible");

  //radio button
cy.get('input[value ="radio1"]').check().should('be.checked')
});

