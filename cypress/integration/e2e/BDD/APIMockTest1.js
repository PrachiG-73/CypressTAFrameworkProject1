///<reference types = "cypress"/>

it('Api intercept mock test', function () {

    cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
    cy.intercept({
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    },

        {
            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "BSG",
                "aisle": "2302"
            }]
        }).as('bookretrival');
    cy.get('button[class="btn btn-primary"]').click();
    cy.wait('@bookretrival').then((interception) => {

        const responseBodyLength = interception.response.body.length + 1;
        cy.get('table tr').should('have.length', responseBodyLength)

    })
    cy.get('p').should('contain.text', 'Oops')
});