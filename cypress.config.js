const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
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
    setupNodeEvents,
    // specPattern:'D:/Cypress/UdemyCypress/cypress/integration/examples/*.js'
    specPattern:'D:\Cypress\UdemyCypress\cypress\e2e\BDD\*.feature'
  },
});
