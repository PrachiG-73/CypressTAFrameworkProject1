///<reference types ='cypress'/>
it("Webtables", function () {
  cy.visit(Cypress.env('url')+"/AutomationPractice/");

  cy.get(".table-display#product tr td:nth-child(2)").each(
    ($e1, index, $list) => {
      if ($e1.text().includes("Python")) {
        cy.get(".table-display#product tr td:nth-child(2)")
          .eq(index)
          .next()
          .then(function (price) {
            const priceText = price.text();
            expect(priceText).to.equal("25");
          });
      }
    }
  );
});
