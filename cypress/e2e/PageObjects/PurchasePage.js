export class PurchasePage {
  getCountryField() {
    return cy.get("#country");
  }
  getCountrySuggestions() {
    return cy.get("div.suggestions");
  }
  getPurchaseButton(){
    return cy.get('input[value="Purchase"]')
  }
getCheckbox(){
    return cy.get('#checkbox2')
}
  getSuccessMessage(){
    return cy.get('.alert.alert-success')
  }
}
