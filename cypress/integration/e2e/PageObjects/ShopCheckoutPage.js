export class ShopCheckoutPage{

    getMainCheckoutButton(){
        return cy.get(".btn.btn-success")
    }
getColumnIndividualTotalAmount(){
return cy.get('tr td:nth-child(4) strong')
}
getTotalAmount(){
    return cy.get('td h3 strong')
}
    }
