Feature: Update inStock status on a car

    Background:
        * def carId = 1001
        # * def carToAdd = 
        #         """ 
        #             {
        #             "dealerCity": "Izaiahfort",
        #             "carModel": "AUDI A1",
        #             "releaseDate": "2022-01-28T08:45:36.248Z",
        #             "carId": ,
        #             "transmissionType": "Automatic",
        #             "inStock": false
        #             }
        #         """
    Scenario: Create a new "car" Document in the DB with inStock false
        Given url 'http://localhost:8080/api/cars/addNewCar'
        And request {"dealerCity": "Izaiahfort","carModel": "AUDI A1","releaseDate": "2022-01-28T08:45:36.248Z","carId": '#(carId)',"transmissionType": "Automatic","inStock": false}
        When method POST
        Then status 200
        And match $ contains {"message" : "DOCUMENT UPDATED"}

    Scenario: Get Car by carId and assert is not in stock
        Given url 'http://localhost:8080/api/cars/getCarDetails'
        And request {"carId" : '#(carId)'}
        When method POST 
        Then status 200
        And match each $ contains {"inStock" : false}

    Scenario: Set the car as with inStock true
        Given url 'http://localhost:8080/api/cars/updateInStock'
        And request {"carId": '#(carId)' , "inStock":true}
        When method POST
        Then status 200
        And match $ contains {"message" : "DOCUMENT UPDATED AND INSERTED IN PARKINGLOT"}

    Scenario: Check that the car is now inStock
        Given url 'http://localhost:8080/api/cars/getCarDetails'
        And request {"carId" : '#(carId)'}
        When method POST 
        Then status 200
        And match each $ contains {"inStock" : true}