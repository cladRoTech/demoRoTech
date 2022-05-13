Feature: Test the "inStock" flow

    Background:
        * def random = function(){ var temp = ''; karate.repeat(5, function(){ temp += Math.floor(Math.random() * 9) + 1 }); return temp; }
        * def carId = random()
    Scenario: Create a new "car" Document in the DB with inStock false
        Given url 'http://localhost:8080/api/cars/addNewCar'
        And request {"dealerCity": "Rome","carModel": "AUDI A1","releaseDate": "2022-01-28T08:45:36.248Z","carId": '#(carId)',"transmissionType": "Automatic","inStock": true}
        When method POST
        Then status 200
        And match $ contains {"message" : "DOCUMENT UPDATED"}

        Given url 'http://localhost:8080/api/cars/getCarDetails'
        And request {"carId" : '#(carId)'}
        When method POST 
        Then status 200
        And match each $ contains {"inStock" : true}

        Given url 'http://localhost:8080/api/park/getCar'
        And request {"carId": '#(carId)'}
        When method POST
        Then status 200
        And match each $ contains { section: '#notnull' }