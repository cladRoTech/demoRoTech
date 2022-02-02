// contactController.js
// Import contact model
const { body, validationResult } = require('express-validator');
Park = require('../models/parkingModel')
const opts = {runValidators : true}

//update the transmissionType of the car 
exports.updateParkingSection = function (req, res) {
    Park.findOneAndUpdate({carId : req.body.carId}, {section : req.body.section}, opts, function (err, car) {
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

exports.view = function (req, res) {
    Park.find({carId : req.body.carId}, function (err, car) {
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
