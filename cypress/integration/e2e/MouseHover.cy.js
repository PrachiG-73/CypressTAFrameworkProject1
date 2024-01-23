///<reference types ='cypress'/>
it("MouseHover", function () {
  cy.visit(Cypress.env('url')+"/AutomationPractice/");

  /*cy.get(".mouse-hover-content").invoke("show");
  cy.contains("Top").click();*/

  cy.contains("Top").click({force:true});
  cy.url().should("contain", "top");
});
