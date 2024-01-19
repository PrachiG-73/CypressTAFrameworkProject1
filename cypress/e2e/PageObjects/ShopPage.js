export class ShopPage{

getProductsMainCard(){
    return cy.get("h4.card-title")
}
getAddButton(){
    return cy.get("div.card-footer")
}

getCheckoutButton(){
    return cy.get('.nav-item.active')
}

}