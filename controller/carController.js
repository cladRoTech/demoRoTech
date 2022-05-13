// contactController.js
// Import contact model
const { body, validationResult } = require('express-validator');
const Chance =  require ('chance');
const chance = new Chance();
Car = require('../models/carModel');
Park = require('../models/parkingModel')
const opts = {runValidators : true}

// Handle index actions
exports.index = function (req, res) {
    Car.get(function (err, car) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "All cars retrieved successfully",
            data: car
        });
    });
};

//update the status of inStock variable in the car DB, if set to true create the entry in the parkingLot collection
exports.updateInStock = function (req, res) {
    Car.findOneAndUpdate({carId : req.body.carId}, {inStock : req.body.inStock}, opts, function (err, car) {
        if (err){ //check for possible bad request errors
            return res.status(400).json({
                status: 400,
                content: {
                    message: err.toString()
                }
            })
        }
        else if(req.body.inStock){ //if inStock value is set to true create an entry in the parkingLot collection
            Park.create({
                carId : req.body.carId,
                parkedDate : new Date().toISOString(),
                section: chance.string({length : 1, pool: "12345"}) + chance.string({length: 1, pool: 'abcde'})
            })
        res.json({
            message: 'DOCUMENT UPDATED AND INSERTED IN PARKINGLOT'
        });
        }
        else{ //if inStock value is set to false delete the entry from the parkingLot collection
        Park.deleteOne({carId : req.body.carId}, function (err, park){}) 
        res.json({
            message: 'DOCUMENT UPDATED'
        });
    }
    });
};

//update the transmissionType of the car 
exports.updateTransmissionType = function (req, res) {
    Car.findOneAndUpdate({carId : req.body.carId}, {transmissionType : req.body.transmissionType}, opts, function (err, car) {
        if (err){
            return res.status(400).json({
                status: 400,
                content: {
                    message: err.toString()
                }
            })
        }
        res.json({
            message: 'DOCUMENT UPDATED'
        });
    });
};


//Insert new car and if inStock === true create document for ParkingLot
exports.insert = function (req, res) {
    //create a new car in the cars collection from the request body
    Car.create({
        dealerCity : req.body.dealerCity, 
        carModel : req.body.carModel,
        releaseDate : req.body.releaseDate,
        carId : req.body.carId,
        transmissionType : req.body.transmissionType,
        inStock : req.body.inStock
    }, function (err, car) {
        if (err){
            return res.status(400).json({
                status: 400,
                content: {
                    message: err.toString()
                }
            })
        }
        else if(!req.body.inStock){ //check if the boolean value of inStock is false, if so just insert the new car without setting it in the parkingLot
            res.json({
                message: "DOCUMENT UPDATED"
            })
        }
        else{ //if inStock is set to true generate a document for parkingLot collection to be stored
            Park.create({
                carId : req.body.carId,
                parkedDate : new Date().toISOString(),
                section: chance.string({length : 1, pool: "12345"}) + chance.string({length: 1, pool: 'abcde'})
            })
        res.json({
            message: 'DOCUMENT UPDATED'
        });
    }
    });
};


//find Car by CARID
exports.view = function (req, res) {
    Car.find({carId : req.body.carId}, function (err, car) {
        if (err){
            return res.status(400).json({
                status: 400,
                content: {
                    message: err.toString()
                }
            })
        }
        else if(car.length == 0){
            return res.status(404).json({
                status: 404,
                content: {
                    message: "The requested car is not in the DB"
                }
            })
        }
        else{
            res.json(car)
        }
    });
};
