Feature: Update inStock status on a car

Background:
    #* def carId = function(){ return java.util.UUID.randomUUID() + '' }
    * def random = function(){ var temp = ''; karate.repeat(5, function(){ temp += Math.floor(Math.random() * 9) + 1 }); return temp; }
    * def carId = random()
    # * def carId =
    #             """
    #             function(s) {
    #             var randomInt2 = Math.random().toFixed(s).split('.')[1];
    #             var randomNum = randomInt2;
    #             return randomNum;
    #             }
    #             """
Scenario: Create a new "car" Document in the DB with inStock false
    Given url 'http://localhost:8080/api/cars/addNewCar'
    And request {"carId" : '#(carId)'}
    When method POST
    Then status 200