const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    //Run spec file and Set env var through terminal
    //npx cypress run --headed --browser chrome --spec cypress\e2e\ProtoCommerceFramework1.cy.js --env url="https://rahulshettyacademy.com"
    //any value in config.js will be overwritten url: "https://google.com"
    url: "https://rahulshettyacademy.com",
  },
  projectId: "7vipdj",
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    pageLoadTimeout: 100000,
    defaultCommandTimeout: 4000,
    video: true,
    reporter: "mochawesome",
    // modifyObstructiveCode: true,
    // experimentalSourceRewriting:false,
    chromeWebSecurity: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // specPattern:'D:/Cypress/UdemyCypress/cypress/integration/examples/*.js'
  },
});
