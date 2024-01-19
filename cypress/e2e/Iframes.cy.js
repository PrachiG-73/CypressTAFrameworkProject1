/// <reference types ="cypress"/>
/// <reference types ="cypress-iframe"/>

import "cypress-iframe"

it("Iframes", function () {
  cy.visit(Cypress.env('url')+"/AutomationPractice/")
  cy.frameLoaded("#courses-iframe")
 cy.wait(2000)
  cy.iframe()
    .find('a[href *= "mentorship"]').eq(0)    //need to allow insecure content from browser for now
    .click()
cy.wait(1000)
    cy.iframe().find('h1[class*="pricing-title"]').should('have.length',2)
})
