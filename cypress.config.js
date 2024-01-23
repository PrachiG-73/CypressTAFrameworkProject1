// import excelToJson from "convert-excel-to-json";
const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, } = require("@badeball/cypress-cucumber-preprocessor");
const { preprocessor, } = require("@badeball/cypress-cucumber-preprocessor/browserify");
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  // on('task', tasks);
  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync returns a Buffer
      });
      return result;
    }
  });

  on("file:preprocessor", preprocessor(config));

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
    chromeWebSecurity: true,
    setupNodeEvents,
    specPattern: "cypress/integration/e2e/BDD/*.js"
  }

});
