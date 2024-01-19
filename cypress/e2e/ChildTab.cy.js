/// <reference types = 'cypress'/>
it("AP Testing 3", function () {
  cy.visit(Cypress.env('url')+"/AutomationPractice/");
  cy.get("#opentab").invoke("removeAttr", "target").click();
  cy.origin("https://www.qaclickacademy.com/", function () {
    cy.get("#navbarSupportedContent .navbar-nav").contains('About us').click()
    cy.get("#about-page h2").should("contain", "QAClick Academy")
  });
});
