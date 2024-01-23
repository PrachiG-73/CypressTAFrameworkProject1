
let ProductName;
describe('JWT', () => {

    it('Login API ', () => {

        cy.LoginCall().then(function () {

            cy.visit('https://rahulshettyacademy.com/client/',
                {
                    onBeforeLoad: function (window) {
                        window.localStorage.setItem("token", Cypress.env('token'))
                    }
                })

        })
        cy.get('.card-body h5').eq(1).then(function (element) {
            ProductName = element.text();
        })
        cy.get('.card-body button:last-of-type').eq(1).click();
        cy.get('[routerlink*="cart"]').click();
        cy.contains('Checkout').click();
        cy.get('[placeholder = "Select Country"]').type("India");
        cy.get('.ta-results.list-group.ng-star-inserted  span').each((result, index, list) => {
            if (result.text() == ' India') {
                cy.wrap(result).click()
            }

        })

        cy.get('a.action__submit').click();
        cy.wait(2000)
        cy.get('.order-summary button').eq(1).click()
        const excelPath = Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_impulseprachi679.xlsx'


        cy.task('excelToJsonConverter', excelPath).then((result) => {
            console.log(result.data[1].A)
            expect(ProductName).to.equal(result.data[1].B)

        })
        
        cy.readFile(excelPath).then((exceldata) => {

            expect(exceldata).to.include(ProductName);
        })
        
    })

})