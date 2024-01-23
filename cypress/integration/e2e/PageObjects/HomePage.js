export class HomePage {
  getNameField() {
    return cy.get('.form-group input[name="name"]');
  }

  getTwoWayDataField() {
    return cy.get('h4 input[name="name"]');
  }

  getGenderDropdown() {
    return cy.get(".form-group select#exampleFormControlSelect1");
  }

  getEntrepenuerRadiobutton() {
    return cy.get("#inlineRadio3");
  }
  getShopTab() {
    return cy.get("a.nav-link").contains("Shop");
  }
}
