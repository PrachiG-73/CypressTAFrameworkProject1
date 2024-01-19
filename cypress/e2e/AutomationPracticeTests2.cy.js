/// <reference types = 'cypress'/>
it("AP Testing 2", function () {
  cy.visit(Cypress.env('url')+"/AutomationPractice/");

  cy.get("#alertbtn").click();

  cy.on("window:alert", (alertText) => {
    expect(alertText).to.equal(
      "Hello , share this practice page and share your knowledge"
    );
  });

  cy.get('#confirmbtn').click()
  cy.on('window:confirm',(confirmText)=>{

    expect(confirmText).to.equal('Hello , Are you sure you want to confirm?')
  })
});
