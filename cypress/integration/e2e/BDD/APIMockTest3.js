/// <reference types="cypress" />

describe("Mock Request Test3", () => {
  it('API call',function(){
    cy.request('POST','http://216.10.245.166/Library/Addbook.php',{
    "name":"Learn Appium Automation with Java",
    "isbn":"bcags",
    "aisle":"877",
    "author":"John foe"
    }).then(function(response){
    expect(response.body).to.have.property("Msg","successfully added")
    expect(response.status).to.equal(200)
    })
  })
})
  