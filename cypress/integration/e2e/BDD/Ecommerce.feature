Feature: End to end Ecommerce validation

    application Regression
    @Regression
    Scenario: Ecommerce products delivery 
    Given I open Ecommerce Page 
    When I add items to cart
    And Validate the total prices 
    Then Select country Purchase and verify Thankyou Message

    @Smoke
    Scenario: Filling the form details
    Given I open Ecommerce Page 
    And filling the form details
        |name|gender| 
        |john|Male|
    When Validate the forms behaviour 
    Then Select the shop page 