// contactModel.js
const req = require('express/lib/request');
const { body, validationResult } = require('express-validator');
var mongoose = require('mongoose');

// Setup schema
var carSchema = mongoose.Schema({

    flowTransactionId : {type: String},
    dealerCity : {type: String},
    carModel : {type: String},
    releaseDate : {type: Date},
    carId : {type: Number , required: [true, "carId cannot be null, check request body again."]},
    transmissionType : {type: String, enum: {values : ['Manual' , 'Automatic']}},
    inStock : {type: Boolean},
    color : {type: String}

}, {versionKey : false});

// Export Contact model
var Car = module.exports = mongoose.model('Car' , carSchema , 'cars');
module.exports.get = function (callback, limit) {
    Car.find(callback).limit(limit);
}

module.exports.post = function (callback, limit) {
    Car.findOneAndUpdate(callback)
    Car.create(callback)
}

