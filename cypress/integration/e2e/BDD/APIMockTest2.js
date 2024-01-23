/// <reference types="cypress" />

describe("Mock Request Test", () => {
    it("should modify the request URL", () => {
      cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  
      cy.intercept(
        {
          method: 'GET',
          url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        },
        (req) => {
          req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra';
          req.continue((res) => {
            expect(res.statusCode).to.eq(200);
          });
        }
      ).as("dummyurl");  
      cy.get("button[class='btn btn-primary']").click();
      cy.wait("@dummyurl");
    });
  });
  