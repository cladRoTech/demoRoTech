Feature: Get all cars
    Scenario: Testing valid GET endpoint
    Given url 'http://localhost:8080/api/cars/getAllCars'
    When method GET
    Then status 200