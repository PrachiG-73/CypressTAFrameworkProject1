before(function () {
    cy.fixture("example").then(function (testData) {
      this.testData = testData;
    });
    Cypress.config("defaultCommandTimeout", 8000);
  });